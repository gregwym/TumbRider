(function() {
  App.populator('to-tumblr', function (page) {
    $(page).on('appShow', function () {
      if(typeof user !== 'undefined') {
        App.load('dashboard');
      } else {
        window.location = '/auth/tumblr';
      }
    });
  });

  App.populator('logout', function (page) {
    $(page).on('appShow', function () {
      window.location = '/logout';
    });
  });

  App.populator('dashboard', function(page, args) {
    if(typeof user !== 'undefined') {
      $(page).find('#welcome-username').text(user.tumblr.name);
    }

    var template = $('#photos-block').html();
    var pageSize = 10,
        pageNum = args.pageNum;
    if (!args.pageNum) {
      pageNum = 0;
    }
    console.log('Loading dashboard, page: ' + pageNum);

    // Construct post DOMs
    var posts = [];
    $.ajax({
      url: '/tumblr/user/dashboard',
      dataType: 'json',
      async: false,
      data: { limit: pageSize, offset: pageSize * pageNum },
      success: function(data) {
        posts = data.posts;
      }
    });

    $.each(posts, function(key, post) {
      post.index = key;
      if (post.photos) {
        $(page).find('.tumb-content').append(_.template(template, post));
      }
    });

    // Setup post actions
    $(page).find('.tumb-post').on('click', function(event) {
      var postIndex = $(this).attr('data-post-index');
      App.load('detail', {post:posts[postIndex]});
    });

    // Setup pagination actions
    if(pageNum < 1) {
      $(page).find('.tumb-page-prev').css('display', 'none');
      $(page).find('.tumb-page-back').css('display', 'none');
    } else {
      $(page).find('.tumb-page-back').on('click', function(event) {
        App.load('dashboard', 'fade');
      });
    }

    if(pageNum < 25) {
      $(page).find('.tumb-page-next').on('click', function(event) {
        App.load('dashboard', {pageNum:pageNum + 1}, 'fade');
      });
    } else {
      $(page).find('.tumb-page-next').css('display', 'none');
    }

    console.log('Dashboard page #' + pageNum + ' load completed.');
  }, function(page, args) {
    $(page).find('.tumb-post').unbind();
    $(page).find('.tumb-page-next').unbind();
    $(page).find('.tumb-page-back').unbind();
    console.log('Dashboard page #' + args.pageNum + ' destructed');
  });

  App.populator('detail', function(page, args) {
    var template = $('#detail-image').html();
    $.each(args.post.photos.slice().reverse(), function(key, photo) {
      console.log(photo);
      $(page).find('.tumb-images').prepend(_.template(template, photo));
    });
  });

  // try to restore previous session
  if(typeof user !== 'undefined') {
    try {
      var cardStacks = JSON.parse(localStorage.get('__APP_JS_STACK__/cards'));
      var i = 0;
      for(i = cardStacks.length - 1; i >= 0; i--) {
        if (cardStacks[i][0] === 'dashboard' && !cardStacks[i][1].pageNum) {
          break;
        }
      }
      cardStacks = cardStacks.slice(i, cardStacks.length);
      localStorage.set('__APP_JS_STACK__/cards', JSON.stringify(cardStacks));
      console.log(localStorage.get('__APP_JS_STACK__/cards'));

      App.restore();
    } catch (err) {
      console.log('Failed to restore previous session. ');
      App.load('dashboard');
    }
  } else {
    App.load('login');
  }
}).call();
