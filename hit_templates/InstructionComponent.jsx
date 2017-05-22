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
    
    var instructionStyle = {border: "1px solid black", marginTop: 15};
    var ulStyle = {textAlign: 'left'};
    var headerStyle = {display: 'inline-block', textAlign: 'center', marginLeft: 15};
    var btnStyle = {marginLeft: 5};
    var paragraphStyle = {marginRight: 30, marginLeft: -5};
    var divStyle = {paddingTop: 15};
    
    if(this.state.minimized == true) {
      return(
        <div style={instructionStyle}>
            <h4 style = {headerStyle}><span style={{'fontWeight': 'bold'}}>Instructions</span></h4>
            <button onClick={this.minMaximize} className='btn btn-xs' style={btnStyle}>SHOW</button>
        </div>
      );
    }  else {
      return(
        <div style={instructionStyle}>
          <h4 style = {headerStyle}><span style={{'fontWeight': 'bold'}}>Instructions</span>[Please read CAREFULLY]</h4>
          <button onClick={this.minMaximize} className='btn btn-xs' style={btnStyle}>HIDE</button>
          <ul>
            <p style={paragraphStyle}>
            Imagine that you want to explain to a 6-year old kid why a short story ends the way it does. Your task is derive the general logical rules from a four sentence story to explain why a fifth sentence ends the story well. These rules will be comprised of a <b>left-hand-side</b> premise and a <b>right-hand-side</b> consequence. 

            </p>
            <h4><span style={{'fontWeight': 'bold'}}>Your task has three steps:</span></h4>
      
      
            <li><b>Step 1- Choose The Best Ending:</b> You will be shown two alternative endings to the story. Choose the one that you think is the right ending to the story.
            </li> 

      <li><b>Step 2- Add General Logical Rules:</b> You should add a few general rules which logically explain your choice of ending in the previous step. Each rule is composed of a few left-hand-side premises and one right-hand-side consequence. Your rules should be as <b>general</b> as possible, something that is generally true no matter what the details of the story. You will add each rule in two steps:
          <ul style = {ulStyle}>
            <li><i><b>Step 2.1, construct the left-hand-side of the 'implies' symbol (=>)</b>:</i>Here you can construct one or a few premises. For each presmise you should select a <i>subject</i>, type an <i>action</i>, and then select an <i>object</i>. You may need to add a <i>preposition</i> but if not select -- for the preposition.
            </li>
            <li><i><b>Step 2.2, construct the right-hand-side of the 'implies' symbol (=>)</b>:</i>Here you should construct one consequence. For the consequence, you should select a <i>subject</i>, type an <i>action</i>, and then select an <i>object</i>.
            </li>
          </ul>
      </li>
                 
            <li><b>Step 3 - Ground General Logical Rules to the Story:</b> Ground your general rules from Step 2 by linking parts of your logical rules to the phrases in either the story or your choice of ending in Step 1.  Do this by clicking on a premise, choosing the button corresponding to the phrase to be grounded, then clicking the phrase within the Story block above and see it populate. Click submit and the grounding should appear on the bottom. Click Show Natural Language to see the natural language of your rule. </li>
      
          </ul>
        </div>
      );
    }
  }
});

/*
React component containing examples
*/
var ExampleComponent = React.createClass({
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
    
    var instructionStyle = {border: "1px solid black", marginTop: 15};
    var ulStyle = {textAlign: 'left'};
    var headerStyle = {display: 'inline-block', textAlign: 'center', marginLeft: 15};
    var btnStyle = {marginLeft: 5};
    var paragraphStyle = {marginRight: 30, marginLeft: -5};
    var divStyle = {paddingTop: 15};
    
   if(this.state.minimized == true) {
      return(
        <div style={instructionStyle}>
            <h4 style = {headerStyle}><span style={{'fontWeight': 'bold'}}>Example</span></h4>
            <button onClick={this.minMaximize} className='btn btn-xs' style={btnStyle}>SHOW</button>
        </div>
      );
    }  else {
      return(
      <div style={instructionStyle}>
          <h4 style = {headerStyle}><span style={{'fontWeight': 'bold'}}>Example</span>[Please read CAREFULLY]</h4>
          <button onClick={this.minMaximize} className='btn btn-xs' style={btnStyle}>HIDE</button>

          <h4><span style={{'fontWeight': 'bold'}}>Consider the following example:</span></h4>
          <p><b>Story Context:</b> "It was Karen's final performance in marching band. Karen was playing the snare drum in the band. She played Thriller and Radar Love. The performance was flawless."</p>
          <p><b>Ending 1:</b> "She was very proud of her performance."</p>
          <p><b>Ending 2:</b> "She was really ashamed of how it went."</p>
           <ul>
             <li><b>Step 1- Choose the Best Ending: </b>Here we choose Ending 1 as it fits the logic of the story better.</li>
             <li><b>Step 2- Add General Logical Rules: </b>
            
                  <ul style = {ulStyle}>
                    <li><span style={mStyle}>(Someone</span> plays in <span style={rStyle}>something</span>) <b>and</b> (<span style={rStyle}>something</span> was flawless) <b> implies </b> (<span style={mStyle}>someone</span> is proud of <span style={rStyle}>something</span>)
                    </li>
                  </ul>
              </li>     
             <li><b>Step 3- Ground General Logical Rules to Story: </b>
            
                    <ul style = {ulStyle}>
                      <li><span style={mStyle}>someone -> Karen</span></li>
                      <li><span style={rStyle}>something -> Performance</span></li>
                    </ul>
              </li>
            </ul>
      </div>
      );
    }
  }
});

window.ExampleComponent = ExampleComponent;
window.InstructionComponent = InstructionComponent;
