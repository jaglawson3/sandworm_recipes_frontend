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
      amount: '2,000 pounds',
      },{
      item: 'Spice Mealange (don\'t use synthetic)',
      amount: '12 grams',
      },{
      item: 'Mature Sandworm of Arrakis',
      amount: '2.5 metric tons',
      },{
      item: 'Sugar',
      amount: '100 pounds',
      },{
      item: 'Water of Life (from freshly slain infant Sandworm of Arrakis)',
      amount: '19 gallons'
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
        amount: '400,000',
        },{
        item: 'yams',
        amount: '350,000',
        },{
        item: 'juvenile sandworm of Arrakis',
        amount: '9.5 metric tons',
        },{
        item: 'sage',
        amount: '100,000 metric tons',
        },{
        item: 'sage',
        amount: '100,000 metric tons',
        },{
        item: 'water of life from dead sandworm',
        amount: '7 gallons'
      }],
      directions: '1.Kill 2.Cook 3.Try to eat!',
      cookTime: 12,
      prepTime: 6,
      votes: -7,
      comments: [{
        author: 'Duncan Idaho',
        text: 'delicious!'
      }, {
        author: 'Benegessirit Mother',
        text: 'gross!'
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
