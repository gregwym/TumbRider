(function() {
  /* Helpers */
  var constructPosts = function(page, posts) {
    var template = $('#post-images').html();
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

    $(page).find('.tumb-body').css('display', '');
    $(page).find('.tumb-loader').css('display', 'none');

    console.log('Page load completed.');
  };

  /* Populators */
  // Home Page
  App.populator('home', function(page, args) {
    $(page).find('.tumb-blog-search-submit').on('click', function(event) {
      var blogUrl = $(page).find('.tumb-blog-search-url').val();
      console.log('Blog URL: ' + blogUrl);
      App.load('result', { searchType:'blogs', blogUrl:blogUrl });
    });
  });

  // Result Page
  App.populator('result', function(page, args) {

    // Prepare url and parameters
    var pageSize = 5,
        pageNum = args.pageNum,
        url = '/tumblr',
        data = { limit: pageSize, type: 'photo'};

    if (!args.pageNum) {
      pageNum = 0;
    }

    url += '/' + args.searchType;
    if (args.blogUrl) {
      url += '/' + args.blogUrl + '/posts';
      data.offset = pageSize * pageNum;
    }
    console.log('URL: ' + url + ' DATA: ' + JSON.stringify(data));

    // Retrive all posts
    $.ajax({
      url: url,
      dataType: 'json',
      async: true,
      data: data,
      success: function(data) {
        constructPosts(page, data.posts);
      }
    });
  }, function(page, args) {
    $(page).find('.tumb-post').unbind();
    console.log('Result page destructed');
  });

  // Detail Page
  App.populator('detail', function(page, args) {
    var post = args.post;
    var pic = null;
    if (!post) { return; }

    var template = $('#detail-image').html();
    $.each(post.photos.slice().reverse(), function(key, photo) {
      $(page).find('.tumb-images').prepend(_.template(template, photo));
      pic = photo.original_size.url;
    });

    $(page).find('.tumb-kik-send').on('click', function(event) {
      var message = {
        title: 'Tumblr Image',
        text: post.caption,
        pic: pic,
        big: true,
        data: post
      };
      console.log(message);
      cards.kik.send(message);
    });
  });

  try {
    App.restore();
  } catch (err) {
    console.log('Failed to restore previous session. ');
    App.load('home');
  }
}).call();
