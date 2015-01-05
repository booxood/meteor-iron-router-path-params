Router.map(function(){
  this.route('home', {
    path: '/'
  });

  this.route('p1', {
    path: '/p1/:id',
    subscriptions: function(){
        console.log('p1-1')
        return Meteor.subscribe('post', this.params.id);
    },
    action: function(){
        if(this.ready()){
            console.log('p1-3')
            // Session.set('id', this.params.id);
            this.render();
        }else{
            console.log('p1-2')
            this.render('loading');
        }
    }

  });

  this.route('p2', {
    path: '/p2/:id',
    subscriptions: function(){
        console.log('p2-1')
        return Meteor.subscribe('post', this.params.id);
    },
    action: function(){
        if(this.ready()){
            console.log('p2-3')
            // Session.set('id', this.params.id);
            this.render();
        }else{
            console.log('p2-2')
            this.render('loading');
        }
    }
  })
})


Posts = new Meteor.Collection('posts');

// ----------------------------------------

if (Meteor.isClient) {
  Template.p1.helpers({
    post: function(){
      var post = Posts.findOne({id: location.pathname.replace(/\/p1\//g, '')});
      // var post = Posts.findOne({id: Router.current().params['id']});
      // var post = Posts.findOne({id: Session.get('id')});
      console.log('p1 post:', post);
      return post;
    }
  });

  Template.p2.helpers({
    post: function(){
      var post = Posts.findOne({id: location.pathname.replace(/\/p2\//g, '')});
      // var post = Posts.findOne({id: Router.current().params['id']});
      // var post = Posts.findOne({id: Session.get('id')});
      console.log('p2 post:', post);
      return post;
    }
  });
}

if (Meteor.isServer) {

  Meteor.publish('post', function(id) {
      return Posts.find({id: id});
  });

  Meteor.startup(function () {
    // code to run on server at startup
    Posts.remove({});
    Posts.insert({
      id: '1',
      title: 'hello 1',
      content: 'world 1'
    });
    Posts.insert({
      id: '2',
      title: 'hello 2',
      content: 'world 2'
    });
  });
}
