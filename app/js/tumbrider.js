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

  App.populator('dashboard', function(page) {
    if(typeof user !== 'undefined') {
      $(page).find('#welcome-username').text(user.tumblr.name);
    }

    var template = $('#photos-block').html();
    $.getJSON('/tumblr/user/dashboard?type=photo', function(data) {
      $.each(data.posts, function(key, post) {
        console.log(post);
        $(page).find('.app-content').append(_.template(template, post));
      });
    });
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
