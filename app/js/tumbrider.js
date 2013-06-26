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
    $.ajax({
      url: '/tumblr/user/dashboard',
      dataType: 'json',
      async: false,
      data: { limit: pageSize, offset: pageSize * pageNum },
      success: function(data) {
        $.each(data.posts, function(key, post) {
          if (post.photos) {
            $(page).find('.tumb-content').append(_.template(template, post));
          }
        });
      }
    });

    // Setup post actions
    $(page).find('.tumb-post').on('click', function(event) {
      var postId = $(this).attr('data-post-id');
      App.load('detail', {postId:postId});
    });

    // Setup pagination actions
    if(pageNum < 1) {
      $(page).find('.tumb-page-prev').css('display', 'none');
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
    console.log('Dashboard page #' + pageNum + ' destructed');
  });

  // try to restore previous session
  if(typeof user !== 'undefined') {
    try {
      App.restore();
    } catch (err) {
      console.log('Failed to restore previous session. ');
      App.load('dashboard');
    }
  } else {
    App.load('login');
  }
}).call();
