var app = angular.module("sandwormRecipes", []);

app.controller("sandwormController", ['$scope', '$filter', function($scope, $filter){
//setting empty objects and setting defaults
  $scope.showComments = false;
  $scope.showCommentForm = false;
  $scope.hideCommentForm = true;
  $scope.newRecipe= {};
  $scope.newComment= {};
  $scope.searchText = "";
  $scope.newVisibleRecipe = false;
  $scope.sortFields = ['votes', 'title', 'author'];

//local data to see functionality on frontend

  $scope.recipes = [{
    title: 'Spice Beer',
    author: 'Duke Leto Atreides II',
    image: 'http://welcometotwinpeaks.com/wp-content/uploads/700x933xspice-beer-label-merry-pranxter.jpg.pagespeed.ic.b7ZhmjUle5.jpg',
    ingredients: [{
      item: 'Hops',
      amount: 200,
      unit: 'pounds'
      },{
      item: 'Spice Mealange (don\'t use synthetic)',
      amount: 12,
      unit: 'ounces'
      },{
      item: 'Mature Sandworm of Arrakis',
      amount: 1.5,
      unit: "tons"
      },{
      item: 'Sugar',
      amount: 50,
      unit: 'pounds'
      },{
      item: 'Water of Life (of freshly slain infant Sandworm)',
      amount: 19,
      unit: 'gallons'
      }],
    directions: '1. Do a thing, 2. Do the next thing 3. Finish up 4. Eat the thing',
    cookTime: 24,
    prepTime: 6,
    votes: 2,
    comments: [{
      author: 'Duncan Idaho',
      text: 'delicious!'
      }, {
      author: 'Benegessirit Mother',
      text: 'gross!'
    }],
      commentsVisible: false,
      newCommentVisible: false
    },{
      title: 'Worm Roast',
      author: 'Vladamir Harkonnen',
      image: 'http://www.recipe.com/images/bloody-mary-pot-roast-R117404-ss.jpg',
      ingredients: [{
        item: 'potatoes',
        amount: 400000
        },{
        item: 'yams',
        amount: 350000,
        unit: 'tons'
        },{
        item: 'juvenile Arrakin sandworm meat with skin',
        amount: 9.5,
        unit: 'tons'
        },{
        item: 'sage',
        amount: 100000,
        unit: 'tons'
        },{
        item: 'sage',
        amount: 13560,
        unit: 'tons'
        },{
        item: 'Water of Life (of freshly slain infant Sandworm)',
        amount: 7,
        unit: 'gallons'
      }],
      directions: '1.Kill 2.Saute 3. Sear 4. Cook at 400 degrees 5.Try to eat!',
      cookTime: 12,
      prepTime: 6,
      votes: -7,
      comments: [{
        author: 'Duncan Idaho',
        text: 'delicious!'
      }, {
        author: 'Bene Gessirit Mother',
        text: 'Gross! Made me wish I had died!'
      }],
      commentsVisible: false,
      newCommentVisible: false
  },{
    title: 'Worm au Naturale',
    author: 'The Fremen',
    image: 'http://thumbs.dreamstime.com/thumblarge_841/8414965.jpg',
    ingredients: [{
      item: 'salt',
      amount: 1,
      unit: 'pound'
      },{
      item: 'rotting sandworm carcass of Arrakis',
      amount: 1,
      unit: 'pound'
      }],
    directions: '1.Kill it 2. Clean it 3.Add some salt 4.Try to eat it!',
    cookTime: 0,
    prepTime: 10,
    votes: -71,
    comments: [{
      author: 'Emperor Shaddam the IV',
      text: 'Sheer smell made me vomit!'
    }, {
      author: 'Guild Navigator 2nd class (Space Guild)',
      text: 'Food is for mortals, this tastes like Harkonnan garbage!'
    }],
    commentsVisible: false,
    newCommentVisible: false
},{
  title: 'Worm au Jus',
  author: 'Kwisatz Haderach',
  image: 'http://thumbs.dreamstime.com/thumblarge_841/8414965.jpg',
  ingredients: [{
    item: 'Sandworm bile',
    amount: 1,
    unit: 'gallon'
    },{
    item: 'rotting Arrakin Sandworm',
    amount: 1,
    unit: 'pound'
    }],
  directions: '1.Kill 2. Clean 3.Roast at 375 degrees for 3 hours 4.Try to eat it!',
  cookTime: 0,
  prepTime: 10,
  votes: -71,
  comments: [{
    author: 'Duncan Idaho',
    text: 'Delicious! Honestly, I can eat anything'
  }, {
    author: 'Feyd Rautha (House Harkonnen)',
    text: 'Reminds me of urine with chunks!'
  }],
  commentsVisible: false,
  newCommentVisible: false
}];

// sort by stuff
  var orderBy = $filter('orderBy');

  $scope.order = function(predicate) {
    $scope.predicate = predicate;
    $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
    $scope.recipes = orderBy($scope.recipes, predicate, $scope.reverse);
  };

// adding a new post
  $scope.addRecipe = function(recipe) {
    recipe.date = moment().calendar();
    recipe.votes = 0;
    recipe.comments = [];
    recipe.commentsVisible = false;
    recipe.newCommentVisible = false;
    $scope.recipe.push(recipe);
    $scope.recipe.ingredients.item = {};
    $scope.recipe.ingredients.quantity = {};
    $scope.newRecipeVisible = false;
    $scope.newRecipe = {};
    $scope.postForm.$setUntouched();
  };

  //Add a new comment
  $scope.addComment = function(recipe, newComment) {
    if (newComment.author && newComment.text) {
      recipe.comments.push(newComment);
      $scope.newComment = {};
    }
  };

// votes go up, votes go down
  $scope.changeVote = function(recipe, changeValue) {
    recipe.votes += changeValue;
  };

//changing vote values color
  $scope.displayUpdatedVotes = function(recipe) {
    if (recipe.votes > 0) {
      return "green";
    } else if (recipe.votes < 0) {
      return "red";
    } else {
      return "";
    }
  };
}])
