      // Parameters
      var stopWordList = "a about above across after again against almost alone along already also although always an and another any as ask asked asking asks at away b back backed backing backs be became because become becomes been before began behind being beings best better between big both but by c came can cannot case cases certain certainly clear clearly come could d did differ different differently do does done down down downed downing downs during e each early either end ended ending ends enough even evenly ever f face faces fact facts far felt few find finds for four full fully further furthered furthering furthers g gave general generally get gets give given gives go going good goods got great greater greatest group h had has have having here herself high high high higher highest how however if important in interest interested interesting interests into is it its itself j just k keep keeps kind knew know known knows l large largely last later latest least less let lets like likely long longer longest m made make making might more most mostly mr mrs much must n necessary need needed needing needs never new new newer newest next not now number numbers o of off often old older oldest on only open opened opening opens or order ordered ordering orders other others our out over p part parted parting parts per perhaps place places point pointed pointing points possible present presented presenting presents put puts q quite r rather really right right room rooms s said same saw say says second seconds see seem seemed seeming seems sees several shall should show showed showing shows side sides since small smaller smallest so some states still still such sure t take taken than that the then there therefore think thinks though thought thoughts three through thus to today too took toward turn turned turning turns two u under until up upon use used uses v very w want wanted wanting wants was way ways well wells went were what when where whether which while who whole whose why will with within without work worked working works would x y year years yet you young younger youngest z";
      
      var defaultObjects = ["someone", "something", "somewhere"];
      /*
      React component containing instructions
      */
      var FooterInstructionComponent = React.createClass({
        getInitialState: function() {
          var inst = []
          inst.push('READ the story and provided ending.')
          inst.push('SELECT a subject placeholder from the dropdown list')
          inst.push('SELECT an object placeholder from the dropdown list')
          inst.push('TYPE a predicate - how does the subject interact with the object?')
          inst.push('ADD a new premise if necessary')
          inst.push('CONSTRUCT a consequence - the result of the sequence of premises constructed?')
          inst.push('SAVE the rule by clicking the \'save rule\' button.')
          inst.push('CONTINUE by clicking the \'next step\' button. \n OR add a new rule.')
          return{ instructions: inst, step: 1, substep: 2, r:1, minimized:false } // step, substep, highlight step
        },
        
        componentWillReceiveProps(nextProps) {
          var inst = []
          if(nextProps.step == 1) {
            if(nextProps.substep == 1) {
              inst.push('READ the story and provided ending.')
              inst.push('SELECT a subject placeholder from the dropdown list.')
              inst.push('SELECT an object placeholder from the dropdown list.')
              inst.push('TYPE a predicate - how does the subject interact with the object?')
              inst.push('ADD a new premise if necessary.')
              inst.push('CONSTRUCT a consequence - the result of the sequence of premises constructed?')
              inst.push('SAVE the rule by clicking the \'save rule\' button.')
              inst.push('CONTINUE by clicking the \'next step\' button. \n OR add a new rule.')
            }
          } else if(nextProps.step == 2) {
            if(nextProps.substep == 1) {
              inst.push('SELECT a premise or implication to ground to the context by clicking the associated \'ground to context\' button.')
              inst.push('SELECT an element of the phrase to ground.')
              inst.push('HIGHLIGHT a ground-word or ground-phrase in the context and SUBMIT the grounding.')
              inst.push('REPEAT steps 1 through 4 for all necessary premises/implications.')
            }
          }
          this.setState({instructions:inst})
          // don't have to do this check first, but it can help prevent an unneeded render
          if (nextProps.step !== this.state.step) {
            this.setState({ step: nextProps.step });
          }
          if (nextProps.substep !== this.state.substep) {
            this.setState({ substep: nextProps.substep });
          }
          if (nextProps.r !== this.state.r) {
            this.setState({ r: nextProps.r });
          }
        },
        
        minMaximize: function() {
          var m = !this.state.minimized;
          this.setState({minimized: m});
        },
        
        render: function() {
          var instructionStyle = { width: 300, height:200 };
          var btnStyle = {marginLeft: 5};
          if(this.state.minimized == false) { // if minimized
            return(
              <div style={instructionStyle}>
                <b>Recommended Steps</b>
                <button onClick={this.minMaximize} style={btnStyle} className='btn btn-xs'>HIDE</button>
                <ol>
                  {this.state.instructions.map(function(instruction, i){
                    if(i == this.state.r) {
                      return <li key = {i}><mark>{instruction}</mark></li>;
                    } else {
                      return <li key = {i}>{instruction}</li>;
                    }
                  },this)}
                </ol>
              </div>
            );
          } else {
            return(
              <div>
                  <b>Recommended Steps</b>
                  <button onClick={this.minMaximize} style={btnStyle} className='btn btn-xs'>SHOW</button>
              </div>
            );
          }
        }
      });
      ReactDOM.render(<FooterInstructionComponent step={1} substep={1} r={1} />, document.getElementById('footer-instructions'));
    
      /*
      React component containing instructions
      */
      var InstructionComponent = React.createClass({
        getInitialState: function() {
          return { minimized: false }
        },
        
        minMaximize: function() {
          var m = !this.state.minimized;
          this.setState({minimized: m});
        },
        
        render: function() {
          /*
          Instruction color styling
          */
          var bStyle = {color: 'blue'},
              rStyle = {color: 'red'},
              pStyle = {color: 'purple'},
              gStyle = {color: 'green'},
              oStyle = {color: 'orange'},
              yStyle = {color: 'yellow'},
              mStyle = {color: 'magenta'},
              olStyle = {color: 'olive'}
          
          /***********/
          var instructionStyle = {border: "1px solid black", marginTop: 15};
          var ulStyle = {textAlign: 'left'};
          var headerStyle = {display: 'inline-block', textAlign: 'center', marginLeft: 15};
          var btnStyle = {marginLeft: 5};
          var paragraphStyle = {marginRight: 30, marginLeft: -5};
          var divStyle = {paddingTop: 15};
          
          if(this.state.minimized == true) {
            return(
              <div style={instructionStyle}>
                  <h4 style = {headerStyle}><b>Instructions and Examples</b></h4>
                  <button onClick={this.minMaximize} className='btn btn-xs' style={btnStyle}>SHOW</button>
              </div>
            );
          }  else {
            return(
              <div style={instructionStyle}>
                <h4 style = {headerStyle}><b>Instructions and Examples</b></h4>
                <button onClick={this.minMaximize} className='btn btn-xs' style={btnStyle}>HIDE</button>
                <ul>
                  <p style={paragraphStyle}>
                  <b><u>Imagine that you want to describe to a 5-year old kid why a short story ends in the way it does</u></b> as opposed to having a different conclusion. <b><u>Your task is to derive and ground general inference rules from the context</u></b> to explain why an arbitrary fifth-sentence ending logically follows a four-sentence context. An inference rule has an easy basic logical reasoning that we all do on a daily basis: it has a few <b>left-hand-side premises</b> which result in (an implication) <b>some right-hand-side consequence.</b>  Please see below for more examples.
                  </p>
                  <h4>Your task has TWO steps:</h4>
                  <li><b>1- Construct</b> some inference rules (Step 1) by:</li>
                    <ul style = {ulStyle}>
                      <li><i>Selecting a subject</i>, <i>writing</i> a predicate, and <i>selecting</i> an object on the left-hand-side of an implication-symbol</li>
                      <li><i>Constructing</i> an implication to the right hand side</li>
                    </ul>
                  <p style={paragraphStyle}> Remember, your rules should be easily <b>derivable</b> from the context and should be focused on answering <b><i>why</i></b> the given fifth sentence is correct. Each rule should be composed of a <b>subject</b>, a <b>predicate</b>, and an <b>object</b> and should be as <b>general</b> as possible. Do not include specific elements from the context in your rule. To simplify the process, a number of sample objects/subjects are provided for you.</p>
                 
                  <li><b>2- Ground</b> these rules to the story to make them specific. Do this by linking terms to phrases in either the context or the given fifth sentence (Step 2).</li>
                  
                  <p style={paragraphStyle}>Properties of good rules and groundings are provided below.</p>
                  
                  <h4><b>Example</b></h4>
                  <h4>The given story is as follows:</h4>
                  <li>Context: Karen was assigned a roommate her first year of college. Her roommate asked her to go to a nearby city for a concert. Karen agreed happily. The show was absolutely exhilarating.</li>
                  <li>correct 5th sentence: Karen became good friends with her roommate. </li>
                  
                  <li>Good, generic inference rules for the above: </li>
                    <ul style = {ulStyle}>
                      <li><span style={bStyle}>Someone</span> is not friends with <span style={rStyle}>someone</span> <b>and</b> <span style={pStyle}>someone</span> goes out with <span style={gStyle}>someone</span> <b>and</b> <span style={oStyle}>someone</span> enjoys <span style={yStyle}>it</span> <b>=></b> <span style={mStyle}>someone</span> becomes friends with <span style={olStyle}>someone</span></li>
                    </ul>
                  <li>Bad inference rules: </li>
                    <ul style = {ulStyle}>
                      <li>Someone(Karen's roommate) asks out someone(Karen) <b>and</b> something(this show) was exhilarating <b>=></b> someone(roommate) agrees happily</li>
                    </ul>
                  <p style={paragraphStyle}><h4><b>Step 2 (grounding elements)</b></h4> - The context and rule elements you link between should be logically related. You should associate characters, items, and ideas.</p>
                  <li>Good links: </li>
                    <ul style = {ulStyle}>
                      <li><span style={bStyle}>someone -> Karen</span></li>
                      <li><span style={rStyle}>someone -> Karen's roommate</span></li>
                      <li><span style={pStyle}>someone -> Karen</span></li>
                      <li><span style={gStyle}>someone -> Karen's roommate</span></li>
                      <li><span style={oStyle}>someone -> Karen</span></li>
                      <li><span style={yStyle}>it &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; -> going out</span></li>
                      <li><span style={mStyle}>someone -> Karen</span></li>
                      <li><span style={olStyle}>someone -> Karen's roommate</span></li>
                    </ul>
                  <li>Bad links: </li>
                    <ul style = {ulStyle}>
                      <li>someone  &nbsp;&nbsp;-> goes out</li>
                      <li>something  -> becomes</li>
                    </ul>
                </ul>
              </div>
            );
          }
        }
      });
      ReactDOM.render(<InstructionComponent />, document.getElementById('instruction-div'));
      
      /*
      React component containing rendered consequence
      */
      var ConsequenceComponent = React.createClass({ // fix 20 index button linking
        getInitialState: function() {
          return { linking: false, // are we currently linking?
                   linkList: [],   // words
                   i:-1,           // temporary index of linked word
                   colors:{}       // array of color links
                  }
        },
      
        setLink: function() { // i, j, grounding jth word of ith action
          if(this.props.alreadyLinking == false) {
            this.setState({linking: true});
            this.setState({linkList: this.props.cons.trim().split(" ")});
            $('#story').removeClass('noselect');
            $('#story-ending').removeClass('noselect');
            this.props.toggleLink();
          }
        },
        
        link: function(i) {
          var word = this.state.linkList[i];
          this.refs.linked_element.value = word;
          this.setState({i: i});
        },

        saveLink: function() {
          var color = new RColor;
          var c = color.get(true);
          var cols = this.state.colors;
          cols[this.state.i] = c;
          this.setState({colors: cols});
          if(this.props.selectedText == "") {
            alert('You have not selected anything from the context to ground to. It is recommended that you reground this word.');
          }
          this.props.addLink(20, this.state.i, this.props.selectedText,c);
          $('#story').addClass('noselect');
          $('#story-ending').addClass('noselect');
          this.setState({linking: false});
          this.props.toggleLink();
        },
        
        render: function() {
          var btnStyle = { marginLeft: 5, marginRight: 0 };
          var groundBtnStyle = { marginLeft: 5, marginRight: 0 };
          var wrapStyle = { display: 'inline-block' };
          var linkedElementStyle = { display: 'inline-block', width: 50, overflow:'hidden', marginBottom:-8, marginLeft:5 };
          var divStyle = { display: 'inline-block', margin: 5, marginBottom: -5 };
          var linkStyle = {marginTop: 40, textAlign: 'center' };
          var s = this.props.step;
          
          // Display grounding button depending if there exists an action we are currently linking
          if(s==1 || this.props.alreadyLinking == true || this.props.linkToggle == true) {
            groundBtnStyle['display'] = 'none';
          } else {
            groundBtnStyle['display'] = '';
          }
          
          // if the step is 2, display the grounding buttons and remove the rule manipulation buttons
          if(this.state.linking == true && this.props.step == 2){
            return (
              <div style = {wrapStyle}>
                <div style={linkStyle}>
                  <textarea ref='linked_element' rows="1" maxLength="50" placeholder="Linked Element" style={linkedElementStyle} disabled></textarea>
                  <span> ==></span>
                  <textarea ref='ground' rows="1" maxLength="50" placeholder="Context" value={this.props.selectedText} style={linkedElementStyle} disabled></textarea>
                  <button onClick={this.saveLink} className='btn btn-xs link-btn btn-success' style={btnStyle}>submit</button>
                </div>
                <div className="actionText" style={divStyle}>
                {
                  this.state.linkList.map(function(word, i) {
                    if (stopWordList.includes(word)) {
                      return(" " + word + " ");
                    } else {
                      return (
                        <button key={i} onClick={() => {this.link(i)}} className='btn btn-xs link-btn' style={btnStyle}>{word}</button>
                      );
                    }
                  },this)
                }
                </div>
              </div>
              );
          } else {
            return(
              <div style = {wrapStyle}>
                <div style={linkStyle}>
                  <button onClick={this.setLink} className='btn btn-xs link-btn' style={groundBtnStyle}>Ground to Context</button>
                </div>
                  <div ref='consequenceText' className='consequenceText' style={divStyle}>{
                    this.props.cons.split(" ").map(function(word, i) {
                      var colStyle = {color: this.state.colors[i]}
                      return(<span key={i} style={colStyle}>{word} </span>);
                    },this)
                  }
                  </div>
              </div>
            );
          }
        }
      });
      
      /*
      React premise component
      */
      var PremiseComponent = React.createClass({
        getInitialState: function() {
          var customVal = false;
          if(this.props.predicateIndex == 0) {
            customVal = true;
          } else { customVal = false }
          return { op: this.props.opdefaultValue, // default operator value for this premise
                   act: this.props.adefaultValue, // default predicate value for this premise
                   customValue: customVal,        // does the worker want to write his own premise?
                   customCustomValue: false,
                   linking: false,                // are we linking this premise?
                   linkList: [],                  // list of words
                   i:-1,                          // index for linked word
                   colors: []                     // set of colors for linked words
                  }
        },
        getAction: function() {
          if(this.state.customValue == true){
            var actionSubject = this.refs.actionSubject.value;
            var actionPredicate = this.refs.actionPredicate.value;
            var actionObject = this.refs.actionObject.value;
            return(actionSubject + " " + actionPredicate + " " + actionObject);
          } else {
            return(this.state.act);
          }
        },
      
        getOp: function() {
          if(this.state.op == '' || this.state.op == null) {return("and");}
          return(this.state.op);
        },
      
        opChangeHandler: function(event){
          this.setState({op: event.target.value});
        },
      
        onBlurHandler: function(event) {
          if(event.target.value == '') {
            this.setState({customValue: false});
          }
        },
      
        actChangeHandler: function(event){
          if(event.target.value == 'customOption') {
            this.setState({customValue: true});
          } else {
            this.setState({act: event.target.value});
          }
        },
      
        setLink: function() { // i, j, grounding jth word of ith action
          if(this.props.alreadyLinking == false) {
            this.setState({linking: true});
            var action = this.getAction();
            this.setState({linkList: action.trim().split(" ")});
            $('#story').removeClass('noselect');
            $('#story-ending').removeClass('noselect');
            this.props.toggleLink();
          }
        },
      
        link: function(i) {
          this.setState({i: i});
          var word = this.state.linkList[i];
          ReactDOM.render(<FooterInstructionComponent step={2} substep={1} r={2} />, document.getElementById('footer-instructions'));
          this.refs.linked_element.value= word;
        },
        contextChange: function() {
          ReactDOM.render(<FooterInstructionComponent step={2} substep={1} r={4} />, document.getElementById('footer-instructions'));
        },
        
        saveLink: function() {
          var color = new RColor;
          var c = color.get(true);
          var cols = this.state.colors;
          cols[this.state.i] = c;
          this.setState({colors: cols});
          if(this.props.selectedText == "") {
            alert('You have not selected anything from the context to ground to. It is recommended that you reground this word.');
          }
          this.props.addLink(this.props.index, this.state.i, this.props.selectedText,c);
          $('#story').addClass('noselect');
          $('#story-ending').addClass('noselect');
          ReactDOM.render(<FooterInstructionComponent step={2} substep={1} r={5} />, document.getElementById('footer-instructions'));
          this.setState({linking: false});
          this.props.toggleLink();
        },
        
        removePremise: function() {
          console.log(this.props.index);
          this.props.removePremise(this.props.index);
        },
        
        componentWillReceiveProps: function(nextProps) {
          if(nextProps.adefaultValue != this.props.adefaultValue) {
            this.refs.actionPredicate.value = nextProps.adefaultValue.split(" ").slice(1, -1).join(" "); // fix later
          }
        },
        
        subjectChange: function() {
          ReactDOM.render(<FooterInstructionComponent step={1} substep={1} r={2} />, document.getElementById('footer-instructions'));
        },
        objectChange: function() {
          ReactDOM.render(<FooterInstructionComponent step={1} substep={1} r={3} />, document.getElementById('footer-instructions'));
        },
        predicateChange: function() {
          ReactDOM.render(<FooterInstructionComponent step={1} substep={1} r={4} />, document.getElementById('footer-instructions'));
        },
      
        render: function() {
          var btnStyle = { marginLeft: 5, marginRight: 0 };
          var objectStyle = {marginRight:5}; //marginRight: 5
          var groundBtnStyle = { marginLeft: 5, marginRight: 0};
          var wrapStyle = { display: 'inline-block', marginBottom: 15};
          var linkedElementStyle = { display: 'inline-block', width: 50, overflow:'hidden', marginBottom:-8, marginLeft:5 };
          var divStyle = { display: 'inline-block', margin: 5, marginBottom: -5 };
          var linkStyle = { marginTop: -25, textAlign: 'center' };
          var formStyle = { width:120, marginRight: 50 };
          var removePremiseStyle = {marginTop: -20};
          var selectStyle = {}
          
          if(this.props.index == this.props.numActions-1) {selectStyle = {display: 'none'};} else {selectStyle={};}
          if(this.props.numActions == 1) {removePremiseStyle={display: 'none'}}else {removePremiseStyle={};}
      
          var s = this.props.step;
          if(s==1 || this.props.alreadyLinking == true || this.props.linkToggle == true) {
            groundBtnStyle['display'] = 'none';
          } else {
            groundBtnStyle['display'] = '';
          }
          
          var actionSubjectDefault = this.props.adefaultValue.split(" ")[0];
          var actionPredicateDefault = this.props.adefaultValue.split(" ").slice(1, -1).join(" ");
          var actionObjectDefault = this.props.adefaultValue.split(" ").slice(-1)[0];
          /*
          return(
                <div style={wrapStyle}>
                  <div style={linkStyle}>
                    <button onClick={this.removePremise} style={removePremiseStyle} className='btn btn-xs save-predicate-btn'>Remove Premise</button>
                  </div>
                  <div className="form-group">
                    <div className="col-xs-3">
                      <select ref='actionSubject' className='form-control form-fixer' defaultValue={actionSubjectDefault} onChange={this.objectChange} style={formStyle}>
                        <option value="someone">someone</option>
                        <option value="something">something</option>
                        <option value="somewhere">somewhere</option>
                      </select>
                    </div>
                    
                    <div className="col-xs-3 margin-left">
                      <textarea ref='actionPredicate' className='form-control form-fixer' rows="1" maxLength="50" cols="10" placeholder="action" defaultValue={actionPredicateDefault} onBlur={this.onBlurHandler} style={formStyle}></textarea>
                    </div>
                    
                    <div className="col-xs-3 margin-left margin-right">
                      <select ref='actionObject' className='form-control' defaultValue={actionObjectDefault} onChange={this.objectChange} style={formStyle}>
                        <option value="someone">someone</option>
                        <option value="something">something</option>
                        <option value="somewhere">somewhere</option>
                      </select>
                    </div>
                    
                    <div classNames="col-xs-3 margin-left form-fixer" style={selectStyle}>
                      <select ref='op' className='form-control' defaultValue={this.props.opdefaultValue} onChange={this.opChangeHandler} style={formStyle}>
                        <option value="and">and</option>
                        <option value="or">or</option>
                      </select>
                    </div>
                  </div>
                </div>
                );
          
          */
          if(this.props.edit == true) {
            if (this.state.customValue == true || this.props.predicateIndex == 0) { // no options to chose from
            return(
                <div style={wrapStyle}>
                  <div style={linkStyle}>
                    <button onClick={this.removePremise} style={removePremiseStyle} className='btn btn-xs save-predicate-btn'>Remove Premise</button>
                  </div>
                  
                  <span style = {wrapStyle}>
                    <select className='soflow' ref='actionSubject' defaultValue={actionSubjectDefault} onChange={this.subjectChange} style={btnStyle}>
                      <option value="" disabled>subject</option>
                      <option value="someone">someone</option>
                      <option value="something">something</option>
                      <option value="somewhere">somewhere</option>
                    </select>
                    
                    <textarea ref='actionPredicate' rows="1" maxLength="50" cols="10" placeholder="action" defaultValue={actionPredicateDefault} onChange={this.predicateChange} style={divStyle} onBlur={this.onBlurHandler}></textarea>
                    
                    <select className='soflow' ref='actionObject' defaultValue={actionObjectDefault} onChange={this.objectChange} style={objectStyle}>
                      <option value="" disabled>object</option>
                      <option value="someone">someone</option>
                      <option value="something">something</option>
                      <option value="somewhere">somewhere</option>
                    </select>
                    
                    <select className='soflow' ref='op' style={selectStyle} defaultValue={this.props.opdefaultValue} onChange={this.opChangeHandler}>
                      <option value="and">and</option>
                      <option value="or">or</option>
                    </select>
                  </span>
                </div>
                );
            } else { // not custom value
              return (
                <div style={wrapStyle}>
                <div style={linkStyle}>
                  <button onClick={this.removePremise} style={removePremiseStyle} className='btn btn-xs save-predicate-btn'>Remove Premise</button>
                </div>
                <div style={wrapStyle}>
                  <select ref='action' style={divStyle} onChange={this.actChangeHandler}>
                      <option selected="selected" defaultValue={this.state.act} disabled>premise</option>
                      {
                      this.props.consList.map(function(consequence) {
                        return(<option key={consequence}
                          value={consequence}>{consequence}</option>);
                      })
                    }
                    <option value="customOption">[custom premise]</option>
                  </select>
                  <select ref='op' style={selectStyle} defaultValue={this.props.opdefaultValue} onChange={this.opChangeHandler}>
                    <option value="and">and</option>
                    <option value="or">or</option>
                  </select>
                </div>
                </div>
                );
            }
          } else {
            if(this.state.linking == true  && this.props.step == 2){
              return(
                <div style = {wrapStyle}>
                  <div style={linkStyle}>
                    <textarea ref='linked_element' rows="1" maxLength="50" placeholder="Linked Element" style={linkedElementStyle} disabled></textarea>
                    <span> ==></span>
                    <textarea ref='ground' rows="1" maxLength="50" placeholder="Context" value={this.props.selectedText} style={linkedElementStyle} onChange={this.contextChange} disabled></textarea>
                    <button onClick={this.saveLink} className='btn btn-xs link-btn btn-success' style={btnStyle}>submit</button>
                  </div>
                  <div className="actionText" style={divStyle}>
                  {
                    this.state.linkList.map(function(word, i) {
                      if (stopWordList.includes(word)) {
                        return(" " + word + " ");
                      } else {
                        return (
                          <button key={i} onClick={() => {this.link(i)}} className='btn btn-xs link-btn' style={btnStyle}>{word}</button>
                        );
                      }
                    },this)
                  }
                  </div>
                  <div style={wrapStyle}>
                    <b style={selectStyle}>{this.props.opdefaultValue}</b>
                  </div>
                </div>
                );
            }
            else {
              return(
                <div style = {wrapStyle}>
                  <div style={linkStyle}>
                    <button ref="linkBtn" onClick={this.setLink} className='btn btn-xs link-btn' style={groundBtnStyle}>Ground to Context</button>
                  </div>
                  <div style = {wrapStyle}>
                    <div className="actionText" style={divStyle}>
                    {
                      this.props.adefaultValue.split(" ").map(function(word, i) {
                        var colStyle = {color: this.state.colors[i]}
                        return(<span key={i} style={colStyle}>{word} </span>);
                      },this)
                    }
                    </div>
                    <b style={selectStyle}>{this.props.opdefaultValue}</b>
                  </div>
                </div>
              );
            }
          }
        }
      });
      
      /*
      React component for rule
      */
      var RuleComponent = React.createClass({
        getInitialState: function() {
  /*        var ed = false;
          if(this.props.index == this.props.consList.length) {
            ed = true;
          }*/
          return { editing: true, actions: [], ops:[], linking: false }
        },
      
        edit: function() {
          this.props.toggleEdit();
          ReactDOM.render(<FooterInstructionComponent step={1} substep={1} r={-1} />, document.getElementById('footer-instructions'));
          this.setState({editing: true});
        },
      
        remove: function() {
          if (this.props.numPreds > 1) {
            console.log('removing predicate');
            this.props.removePredicate(this.props.index);
          } else {
            alert("Must provide at least one implication.");
            return false;
          }
        },
      
        save: function() {
          console.log("saving predicate");
          var actions = [];
          var ops = [];
          for(var ref in this.refs) {
            if(ref.includes('action')) {
              actions.push(this.refs[ref].getAction());
              ops.push(this.refs[ref].getOp());
            }
          }
          var consequencePredicate = this.refs.consequencePredicate.value.trim();
          var consequenceSubject = this.refs.consequenceSubject.value.trim();
          var consequenceObject = this.refs.consequenceObject.value.trim();
          console.log(defaultObjects.indexOf(consequenceObject))
          if(this.props.index > 0 && consequencePredicate=="" && consequenceSubject=="" && consequenceObject=="" && actions.join().trim() == "") { // discard empty inference rules
            this.props.toggleEdit();
            this.setState({editing: false});
            this.remove();
            return false;
          }
          for (var i=0;i<actions.length;i++) {
            var aContent = actions[i].split(" ");
            var aLen = aContent.length-1;
            if(aContent.length < 3 || defaultObjects.indexOf(aContent[0]) == -1 || defaultObjects.indexOf(consequenceSubject) == -1 || defaultObjects.indexOf(aContent[aLen]) == -1 || defaultObjects.indexOf(consequenceObject) == -1 || consequencePredicate == "") { // partially complete form
              alert("Can't leave empty fields in premise");
              return false;
            }
          }
          this.props.toggleEdit();
          this.props.updatePredicate(actions, ops, consequenceSubject + " " + consequencePredicate + " " + consequenceObject, this.props.index);
          ReactDOM.render(<FooterInstructionComponent step={1} substep={1} r={7} />, document.getElementById('footer-instructions'));
          this.setState({editing: false});
        },
      
        addPremise: function() {
          console.log("adding premise");
          var actions = this.state.actions;
          actions.push("");
          ReactDOM.render(<FooterInstructionComponent step={1} substep={1} r={2} />, document.getElementById('footer-instructions'));
          this.setState({actions: actions});
          this.props.addPremise(this.props.index);
        },
        
        removePremise: function(i) { // ith premise
          console.log("removing premise");
          this.props.removePremise(this.props.index,i);
        },
      
        addLink: function(i, j, grounding,c) { // jth word of ith action and color
          this.props.addLink(this.props.index, i, j, grounding, c);
        },
        
        add: function() {
          console.log('adding predicate');
          if(this.props.cons == null || this.props.cons == ''){alert("Please complete elements of this rule."); return(false);}
          this.props.addPredicate();
          this.setState({editing: false});
        },
        
        setLink: function() {
          var l = this.state.linking
          this.setState({linking: !l});
          ReactDOM.render(<FooterInstructionComponent step={2} substep={1} r={1} />, document.getElementById('footer-instructions'));
          this.props.linkToggler();
        },
      
        renderNormal: function() {
          var btnVisibility = "";
          if(this.props.index==this.props.numPreds-1) {
            btnVisibility="inline-block";
          } else {
            btnVisibility="none";
          }
          var divStyle = { display: 'inline-block', margin: 5 };
          var btnStyle = { display: btnVisibility, margin: 5, marginBottom: -15 };
          var font = { fontSize: 50}
      
          if(this.props.step==2) {
            return (
              <div className='predicate'>
              <div><b>{'Inference rule ' + (this.props.index+1) + ':'}</b></div>
              <div className='premise-container' style={divStyle}>
              {
                this.props.act.map(function(action, i) {
                  return (
                    <PremiseComponent
                    key={i}
                    index={i}
                    numActions={this.props.act.length}
                    adefaultValue={action}
                    opdefaultValue={this.props.op[i]}
                    edit={this.state.editing}
                    ref={'action'+i}
                    addLink={this.addLink}
                    contextLinks={this.props.contextLinks[i]}
                    selectedText={this.props.selectedText}
                    step={this.props.step}
                    toggleLink={this.setLink}
                    alreadyLinking={this.state.linking}
                    linkToggle = {this.props.linkToggle}>
                    </PremiseComponent>
                    );
                }, this)
              }
              </div>
              <b>implies</b>
              <ConsequenceComponent
                cons={this.props.cons}
                step={this.props.step}
                addLink={this.addLink}
                selectedText={this.props.selectedText}
                contextLinks={this.props.contextLinks[20]}
                toggleLink={this.setLink}
                alreadyLinking={this.state.linking}
                linkToggle = {this.props.linkToggle}>
              </ConsequenceComponent>
              <hr></hr>
              </div>
            );
          } else {
            if(this.props.edit == true) {
              return (
                <div className='predicate'>
                <div><b>{'Inference rule ' + (this.props.index+1) + ':'}</b></div>
                <div className='premise-container' style={divStyle}>
                {
                  this.props.act.map(function(action, i) {
                    return (
                      <PremiseComponent
                      key={i}
                      index={i}
                      numActions={this.props.act.length}
                      adefaultValue={action}
                      opdefaultValue={this.props.op[i]}
                      edit={this.state.editing}
                      ref={'action'+i}
                      addLink={this.addLink}
                      contextLinks={this.props.contextLinks[i]}
                      selectedText={this.props.selectedText}
                      step={this.props.step}>
                      </PremiseComponent>
                      );
                  }, this)
                }
                </div>
                <b>implies</b>
                <ConsequenceComponent cons={this.props.cons} step={this.props.step} addLink={this.addLink} selectedText={this.props.selectedText} contextLinks={this.props.contextLinks[20]}></ConsequenceComponent>
                <hr></hr>
                </div>
                );
            } else {
              return (
                <div className='predicate'>
                <div><b>{'Inference rule ' + (this.props.index+1) + ':'}</b></div>
                <div className='premise-container' style={divStyle}>
                {
                  this.props.act.map(function(action, i) {
                    return (
                      <PremiseComponent
                      key={i}
                      index={i}
                      numActions={this.props.act.length}
                      adefaultValue={action}
                      opdefaultValue={this.props.op[i]}
                      edit={this.state.editing}
                      ref={'action'+i}
                      addLink={this.addLink}
                      contextLinks={this.props.contextLinks[i]}
                      selectedText={this.props.selectedText}
                      step={this.props.step}>
                      </PremiseComponent>
                      );
                  }, this)
                }
                </div>
                <b>implies</b>
                <ConsequenceComponent cons={this.props.cons} step={this.props.step} addLink={this.addLink} selectedText={this.props.selectedText} contextLinks={this.props.contextLinks[20]}></ConsequenceComponent>
                <button onClick={this.edit} className='btn btn-xs edit-predicate-btn' style={divStyle}>Edit Rule</button>
                <button onClick={this.remove} className='btn btn-xs remove-predicate-btn' style={divStyle}>Remove Rule</button>
                <button ref='addBtn' onClick={this.add} className='btn btn-xs add-predicate-btn'>Add Rule</button>
                <hr></hr>
                </div>
                );
              }
            }
        },
      
        renderForm: function() {
          var divStyle = { display: 'inline-block', margin: 5, marginBottom: -5 };
          var inlineBlock = { marginLeft:10 };
          var btnStyle = { display: 'inline-block', marginLeft: 5, marginRight:-10 };
          var wrapStyle = { display: 'inline-block' };
          
          var consequenceSubjectDefault = this.props.cons.split(" ")[0];
          var consequencePredicateDefault = this.props.cons.split(" ").slice(1, -1).join(" ");
          var consequenceObjectDefault = this.props.cons.split(" ").slice(-1)[0];
      
          return (
            <div className='predicate'>
              <div><b>{'Inference rule ' + (this.props.index+1) + ':'}</b></div>
              <button onClick={this.addPremise} className='btn btn-xs add-variable-btn' style={btnStyle}>Add Premise</button>
              <span className='premise-container' style={inlineBlock}>
              {
                this.props.act.map(function(action, i) {
                  return (
                    <PremiseComponent
                    key={i}
                    index={i}
                    predicateIndex={this.props.index}
                    consList={this.props.consList}
                    numActions={this.props.act.length}
                    adefaultValue={action}
                    opdefaultValue={this.props.op[i]}
                    edit={this.state.editing}
                    ref={'action'+i}
                    addLink={this.addLink}
                    contextLinks={this.props.contextLinks[i]}
                    selectedText={this.props.selectedText}
                    step={this.props.step}
                    removePremise={this.removePremise}>
                    </PremiseComponent>
                    );
                }, this)
              }
              </span>
              <span><b>implies&nbsp;&nbsp;</b></span>
              <span className='consequence-container' style={inlineBlock}>
              <select className='soflow' ref='consequenceSubject' defaultValue={consequenceSubjectDefault} onChange={this.subjectChange}>
                <option value="" disabled>subject</option>
                <option value="someone">someone</option>
                <option value="something">something</option>
                <option value="somewhere">somewhere</option>
              </select>
              
              <textarea ref='consequencePredicate' rows="1" maxLength="50" cols="10" placeholder="consequence" defaultValue={consequencePredicateDefault} style={divStyle}></textarea>
              
              <select className='soflow' ref='consequenceObject' defaultValue={consequenceObjectDefault} onChange={this.objectChange}>
                <option value="" disabled>object</option>
                <option value="someone">someone</option>
                <option value="something">something</option>
                <option value="somewhere">somewhere</option>
              </select>
              </span>
              <button onClick={this.save} className='btn btn-xs save-predicate-btn' style={inlineBlock}>Save Rule</button>
              <hr></hr>
            </div>
            );
        },
//               <button onClick={this.remove} className='btn btn-xs remove-predicate-btn' style={inlineBlock}>Remove Rule</button>
      
        render: function() {
          if(this.state.editing) {
            return this.renderForm();
          } else {
            return this.renderNormal();
          }
        }
      });
      
      var PredicateManager = React.createClass({
        getInitialState: function() { // predicate 1
          var predicates = [  // overall state of the hit
                              [ // predicate
                                [""],[""], "", [[],[]] // action list, op list, consequence, list of groundings- per word
                              ]
                            ];
          predicates[0][3][20] = [""];
          return {
            predicates: predicates,
            consList: [],           // consequence list
            linkToggle: false,      // toggle depending on link state
            step: 1,                // hit step
            edit: true,             // are we editing a rule?
            stepBtn: true
          }
        },
      
        removePredicate: function (i) {
          console.log('removing rule ' + i);
          var predicates = this.state.predicates;
          predicates.splice(i, 1);
          var consequences = this.state.consList;
          consequences.splice(i,1);
          this.setState({consList: consequences});
          this.setState({predicates: predicates});
        },
      
        updatePredicate: function(actions,ops,consequence,i) { // predicate is a tuple of array of variables and an implication jth action, ith consequence
          console.log('updating comment ' + i);
          var predicates = this.state.predicates;
          var consequences = this.state.consList;
          predicates[i][0] = actions;//new Array(actions);
          predicates[i][1] = ops;
          predicates[i][2] = consequence;
          consequences[i] = consequence;
          this.setState({predicates: predicates});
          this.setState({consList: consequences});
          globalState[this.props.index] = this.state.predicates;
        },
      
        addPredicate: function() {
          var predicates = this.state.predicates;
          predicates.push([[""],[""],"",[[],[]]]);
          predicates[predicates.length-1][3][20] = [""];
          this.toggleEdit();
          this.setState({predicates: predicates});
        },
      
        addPremise: function(i) {
          console.log('adding premise');
          var predicates = this.state.predicates;
          predicates[i][0].push("");
          predicates[i][1].push("");
          predicates[i][3].push([[]]);
          predicates[i][3][predicates[i][3].length-20] = [""]; // TODO: fix
          ReactDOM.render(<FooterInstructionComponent step={1} substep={1} r={1} />, document.getElementById('footer-instructions'));
          this.setState({predicates:predicates});
        },
        
        removePremise: function(i, j) { // ith rule, jth premise
          console.log('removing premise: ' + i);

          var predicates = this.state.predicates;
          console.log(predicates[i]);
          
          if (predicates[i][0].length == 1) {
            alert('Rule requires at least one premise.');
            return(1);
          }

          predicates[i][0].splice(j, 1);
          predicates[i][1].splice(j, 1);
          predicates[i][3].splice(j, 1);
          predicates[i][3].splice(j, 1);
          
          console.log(predicates[i]);

          this.setState({predicates:predicates});
        },
      
        addLink: function(i,j,k, grounding ,c) { // ground kth word of the jth action of the ith rule and color
          console.log('grounding element');
          var predicates = this.state.predicates;
          predicates[i][3][j][k] = [grounding,c]; // error here
          this.setState({predicates: predicates});
          ReactDOM.render(<ContextBoard predicates={predicates}></ContextBoard>, document.getElementById('grounding-container'));
        },
        
        toggleLink: function() {
          var l = this.state.linkToggle;
          this.setState({linkToggle: !l});
        },
        
        toggleEdit: function() {
          var ed = this.state.edit;
          ed = !ed;
          this.setState({edit: ed});
        },
      
        nextStep: function() {
          console.log('next step');
          $('#submit-btn').prop('disabled', false);
          var s = this.state.step;
          if (s < 2) {
            if(this.state.consList.length < 1) {
              alert('Need at least one rule...');
              return(1);
            } else {
              if(this.state.edit == true) {
                alert('please finish editing all rules before continuing.');
                return(1);
              }
            }
            s = s+1
            if(s > 1) {
              document.getElementById('context-title').style.display="inline-block";
              document.getElementById('grounding-container').style.display="inline-block";
              this.setState({stepBtn:!this.state.stepBtn});
            }
          }
          this.setState({step: s});
          ReactDOM.render(<FooterInstructionComponent step={2} substep={1} r={0} />, document.getElementById('footer-instructions'));
        },
      
        prevStep: function() {
          console.log('prev step');
          var s = this.state.step;
          if (s > 1) {
            s = s-1;
          }
          if (s == 1) {
            document.getElementById('context-title').style.display="none";
            document.getElementById('grounding-container').style.display="none";
            this.setState({stepBtn:!this.state.stepBtn});
          }
          this.setState({step: s});
          ReactDOM.render(<FooterInstructionComponent step={1} substep={1} r={1} />, document.getElementById('footer-instructions'));
        },
        
        render: function() {
          var nextBtnStyle = { display: 'inline-block', marginRight: 10 };
          var prevBtnStyle = { display: 'inline-block', marginRight: 10 };
          var description = "";
          var miniInstructions = "";
          if(this.state.step==1) {
            description = "Add rules";
            miniInstructions = "Construct rules by specifying premises. Select a subject and object from the drop down lists and type a predicate implied in the story. Add premises by clicking the \'Add Premise\' button. Save the inference rule by clicking \'Save Rule\'. Make sure you have created all inference rules before continuing. You will not be able to return to this step";
          } else if(this.state.step==2) {
            description = "Ground rules";
            miniInstructions = "Ground premise elements by clicking the \'Ground to Context\' button. Select a token from the premise and ground it to a word or phrase in the context or 5th sentence by highlighting the word/phrase with your mouse. Click the \'Submit\' button to save the link";
          }
          if(this.props.index == this.props.i_x) {
            //               <button ref={'prevStep'} onClick={this.prevStep} style={prevBtnStyle} disabled={this.state.stepBtn} className='btn step-bkwd-btn btn-primary'>Previous Step</button>
            return(
              <div className="predicates">
              <div className="row">
              <div className="col-md-4 col-md-offset-4 text-center">
                <h3><b>{"Step: " + this.state.step + " " + description}</b></h3>
                <ol >{
                  miniInstructions.split(".").map(function(bullet,i) {
                    return(<li key={i}>{bullet + "."}</li>);
                  })
                }
                </ol>
                <button ref={'nextStep'} onClick={this.nextStep} style={nextBtnStyle} disabled={!this.state.stepBtn} className='btn step-fwd-btn btn-primary'>Next Step</button>
              </div>
              </div>
              {
                this.state.predicates.map(function(predicate, i) {
                  return (
                    <RuleComponent
                      key={i}
                      index={i}
                      numPreds={this.state.predicates.length}
                      numActions={predicate[0].length}
                      act={predicate[0]}
                      op={predicate[1]}
                      cons={predicate[2]}
                      contextLinks={predicate[3]}
                      consList={this.state.consList}
                      updatePredicate={this.updatePredicate}
                      removePredicate={this.removePredicate}
                      addPredicate={this.addPredicate}
                      addPremise={this.addPremise}
                      addLink={this.addLink}
                      selectedText={this.props.selectedText}
                      step={this.state.step}
                      linkToggle={this.state.linkToggle}
                      linkToggler={this.toggleLink}
                      toggleEdit={this.toggleEdit}
                      edit={this.state.edit}
                      removePremise={this.removePremise}>
                    </RuleComponent>
                    );
                }, this)
              }
              </div>
              );
        } else {
          return(false);
        }
      }
      });
      
      var StoryBoard = React.createClass({
        getInitialState: function() {
          var PredicateManagers = [];
          for(var i=0;i<input_size;i++) {
            PredicateManagers.push(React.createElement(PredicateManager));
          }
          return { PredicateManagers, i_x: 0, changeBoards: false, selectedText: ""}
        },
      
        setNextBoard: function() {
          var i = this.state.i_x;
          this.setState({i_x: i + 1});
          this.setState({changeBoards: true});
          ReactDOM.render(<ContextBoard predicates={this.getFinalState()[this.state.i_x]}></ContextBoard>, document.getElementById('grounding-container'));
        },
      
        setPrevBoard: function() {
          var i = this.state.i_x;
          this.setState({i_x: i - 1});
          this.setState({changeBoards: true});
          ReactDOM.render(<ContextBoard predicates={this.getFinalState()[this.state.i_x]}></ContextBoard>, document.getElementById('grounding-container'));
        },
      
        getFinalState: function() {
          var preds = [];
          var contextLinks = [];
          for(var i=0;i<input_size;i++) {
            preds.push(this.refs['manager'+i].state.predicates);
          }
          return(preds);
        },
      
        render: function() {
          return(
            <div className="predicate-container">
            {
              this.state.PredicateManagers.map(function(predicate, i) {
                return (
                  <PredicateManager
                  key={i}
                  index={i}
                  ref={'manager'+i}
                  i_x={this.state.i_x}
                  selectedText={this.state.selectedText}>
                  </PredicateManager>
                  );
              }, this)
            }
            </div>
          );
        }
      }); // pass idx to each story and render depending if id.
      
      var ContextBoard = React.createClass({
        render: function() {
          var contextStyle = {textAlign: 'left'};
          return(
            <div className="contexts" style={contextStyle}>
            {
              this.props.predicates.map(function(predicate, i) { // ith predicate
                return (
                  predicate[3].map(function(action,j) { //jth action
                    return(
                      action.map(function(mapping,k){ //kth word
                        var colorStyle = {color: mapping[1]};
                        if(mapping != "") {
                          if(j==20){ // if consequence
                            return(
                              <div style={colorStyle}>  {"predicate: "+(i+1) + ", consequence: 0" + ", word: " + (k+1) +"("+predicate[2].split(" ")[k]+") -> "+mapping[0]} </div>
                              );
                          } else {
                            return(
                              <div style={colorStyle}>  {"predicate: "+(i+1) + ", premise: " +(j+1) + ", word: " + (k+1) +"("+predicate[0][j].split(" ")[k]+"): -> "+mapping[0]} </div>
                            );
                          }
                        }
                      },this)
                    );
                  },this)
                );
              }, this)
            }
            </div>
          );
        }
      });
      
      window.app = ReactDOM.render(<StoryBoard />, document.getElementById('predicate-containers'));
      var globalState = [];
      //$('#next-btn').click(function() { app.setNextBoard(); });
      //$('#prev-btn').click(function() { app.setPrevBoard(); });
      $('#story-container').click(function(e) {
        var selected_text_story = $('#story').selection().trim();
        var selected_text_ending = $('#story-ending').selection().trim();
        if(selected_text_story != '') {
          app.setState({selectedText: selected_text_story});
        } else {
          app.setState({selectedText: selected_text_ending});
        }
      });