       var input_size = 0;
      var idx = 0;
      $(function() {
          // Default input to be used during testing + development.
          var DEFAULT_INPUT = ['Karen was assigned a roommate her first year of college. Her roommate asked her to go to a nearby city for a concert. Karen agreed happily. The show was absolutely exhilarating. Karen became good friends with her roommate.'];
      
          var input = null;
          var descriptions = [];
          var endings = []
          var enabled = false;
      
          function main() {
              // Read input to the HIT. In development the default input will be
              // used, and in deployment actual input will be used.
              input = amt.getInput(DEFAULT_INPUT);
              input_size = input.length;
      
              // Set up the descriptions.
              _.each(input, function() { descriptions.push(''); });
              
              for (var i=0; i<input.length; i++) {
                var inp = input[i];
                var ending = "";
                endings.push(inp.split('.')[4] + ".");
                inp = inp.split('.');
                inp.splice(4, 1);
                input[i] = inp.join([separator = '. ']);
              }
      
              // If the HIT is not in preview mode, then we need to enable the UI
              // and set up the logic for submitting.
              if (!amt.isPreview()) {
                  enable_hit();
              }
              render();
          }
      
          // Use the current index to update the image and description
          function render() {
              // Set up the story
              $('#story').val('');
              $('#story').val(input[idx]);
              $('#story-ending').val('');
              $('#story-ending').val(endings[idx]);
      
              // Set up the text area
              $('#text-area').val(descriptions[idx]);
      
              // Refresh the counter
              $('.counter-top').text(idx + 1);
              $('.counter-bottom').text(input.length);
      
              // If the UI is enabled, enable or disable the buttons depending on
              // the index.
              if (enabled) {
                  var prev_btn = $('#prev-btn');
                  var next_btn = $('#next-btn');
                  prev_btn.prop('disabled', true);
                  next_btn.prop('disabled', true);
                  if (idx > 0) {
                      prev_btn.prop('disabled', false);
                  }
                  if (idx < input.length - 1) next_btn.prop('disabled', false);
              }
          }
      
          // Update the index, and save the text in the text area.
          function set_idx(new_idx) {
              if (new_idx < 0 || new_idx >= input.length) return;
              idx = new_idx;
              render();
          }
      
          function enable_hit() {
              // Enable the UI.
              enabled = true;
      
              $('#text-area').prop('disabled', false);
              // Enable the submit button. You must do this in every HIT.
              $('#next-btn').click(function() { set_idx(idx + 1) });
              $('#prev-btn').click(function() { set_idx(idx - 1) });
      
              // submit turk and get HIT id
              amt.setupSubmit();
      
              // Set up a click handler for the submit button.
              $('#submit-btn').click(function() {
                  // Construct an object containing the output.
                  // Output consists of set of tuples (string story, string selection)
                  $('#text-area').val(descriptions[idx]);
                  var comments = $('#comment-area').val();

                  predicates = window.app.getFinalState();
                  var output = _.map(_.zip(input, descriptions, predicates), function(x) {
                      return {'story': x[0], 'description': x[1], 'predicates':x[2], 'comments':comments};
                  });
                  
                  // validate output
                  /*if (output[0]['predicates'].length < 2) {
                    alert('Please construct and link at least 2 inference rules...');
                    return(1);
                  }*/
               
                  var predicates = output[0]['predicates'];
                  var csvOutput=[{}];
                  csvOutput[0]['comments'] = output[0]['comments'];
                  for(var i=0; i< predicates.length; i++) {
                    console.log(predicates[i]);
                    csvOutput.push({});
                    csvOutput[i]['predicate'] = i;
                    for(var j=0; j < predicates[i][0].length;j++) { // actions
                      csvOutput[i]['action'+j] = predicates[i][0][j];
                    }
                    for(var k=0; k < predicates[i][1].length;k++) { // operations
                      csvOutput[i]['operator'+k] = predicates[i][1][k];
                    }
                    csvOutput[i]['consequence'] = predicates[i][2];
      
                    for(var l in predicates[i][3]) { // lth action that contains grounded word in predicate
                      for(var m in l) { // mth grounded word in action
                        if (predicates[i][3][l].hasOwnProperty(m)) {
                          if(predicates[i][3][l][m] !="") {
                            csvOutput[i]['groundedTokenIndex'+l+"-"+m] = predicates[i][3][l][m][0];
                          }
                        }
                      }
                    }
                  }
                  amt.setOutput(csvOutput);
              });
          }
          
          main();
      });