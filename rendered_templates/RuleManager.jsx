var stopWordList = "-- a about above across after again against almost alone along already also although always an and another any as ask asked asking asks at away b back backed backing backs be became because become becomes been before began behind being beings best better between big both but by c came can cannot case cases certain certainly clear clearly come could d did differ different differently do does done down down downed downing downs during e each early either end ended ending ends enough even evenly ever f face faces fact facts far felt few find finds for four full fully further furthered furthering furthers g gave general generally get gets give given gives go going good goods got great greater greatest group h had has have having here herself high high high higher highest how however if important in interest interested interesting interests into is it its itself j just k keep keeps kind knew know known knows l large largely last later latest least less let lets like likely long longer longest m made make making might more most mostly mr mrs much must n necessary need needed needing needs never new new newer newest next not now number numbers o of off often old older oldest on only open opened opening opens or order ordered ordering orders other others our out over p part parted parting parts per perhaps place places point pointed pointing points possible present presented presenting presents put puts q quite r rather really right right room rooms s said same saw say says second seconds see seem seemed seeming seems sees several shall should show showed showing shows side sides since small smaller smallest so some states still still such sure t take taken than that the then there therefore think thinks though thought thoughts three through thus to today too took toward turn turned turning turns two u under until up upon use used uses v very w want wanted wanting wants was way ways well wells went were what when where whether which while who whole whose why will with within without work worked working works would x y year years yet you young younger youngest z";
var defaultObjects = ["someone", "something", "somewhere"];
var defaultPrepositions =["about","after","along","at","but","by","before","during","for", "from", "in","into","on","of","to","with","without", "--"]


var FooterInstructionComponent = window.FooterInstructionComponent;
ReactDOM.render(<FooterInstructionComponent step={1} substep={1} r={1}/>, document.getElementById('footer-instructions'));

var InstructionComponent = window.InstructionComponent;
ReactDOM.render(<InstructionComponent />, document.getElementById('instruction-div'));

var ExampleComponent = window.ExampleComponent;
ReactDOM.render(<ExampleComponent />, document.getElementById('examples-div'));


var Video = window.Video;
ReactDOM.render(<Video />, document.getElementById('video-div'));


var SubHeaderInstructionComponent = window.SubHeaderInstructionComponent;

var PrepphraseComponent = React.createClass({
  getInitialState: function() {
    var pt = "";
    var ps = "";
    var ssinit = false;
    if(this.props.defaultPrep != "") {
      pt = this.props.defaultPrep.trim().split(" ")[0];
      ps = this.props.defaultPrep.trim().split(" ").slice(1,this.props.defaultPrep.trim().length - 1);
      ssinit = true;
    }
    
    return { editing: this.props.editing,
             customSubject: false,
             customType: false,
             showSubject: ssinit,
             prepositionType: '',
             prepositionSubject: '',
             prepositionTypeDefault: pt,
             prepositionSubjectDefault: ps,
             customTypeText: '',
             customSubjectText: ''
            }
  },
  
  prepositionSubjectChangeHandler: function(event){
    if(event.target.value == 'customOption') {
      this.setState({customSubject: true});
    }
    else{
      this.setState({customSubject: false, prepositionSubject: event.target.value});
    }
    //ReactDOM.render(<FooterInstructionComponent step={1} substep={1} r={6} />, document.getElementById('footer-instructions'));
  },



  prepositionCustomSubjectChangeHandler: function(event){
      if(event.target.value.length > 0) {   
        this.setState({prepositionSubject: event.target.value, customSubjectText: event.target.value});
      }
    },
  
  prepositionTypeChangeHandler: function(event){

    if(event.target.value != '--') {
      if(event.target.value == 'customOption') {
        this.setState({showSubject:true, customType: true});
      } else { 
        this.setState({showSubject: true, customType: false, prepositionType: event.target.value});
      }
    } else {
      this.setState({showSubject: false, customType: false, customSubject: false, prepositionType: event.target.value, prepositionSubject: 'subject'});
    }

    //ReactDOM.render(<FooterInstructionComponent step={1} substep={1} r={6} />, document.getElementById('footer-instructions'));
  },


  prepositionCustomTypeChangeHandler: function(event){
      if(event.target.value.length > 0) {   
        this.setState({prepositionType: event.target.value, customTypeText: event.target.value});

      }
    },

  
  getPrepPhrase: function() {
    var d = {};
    d['pType'] = this.state.prepositionType;
    d['pObject'] = this.state.prepositionSubject;
    return(d);

  },

  resetPrepPhrase: function(){
    this.refs.prepositionType.value = '';
    this.refs.prepositionSubject.value='';
    this.setState(this.getInitialState());
  },
  
  render: function() {

    var wrapStyle = { display: 'inline-block', marginBottom: 15};
    var divStyle = { marginRight: 5, marginBottom: -5, width:'auto', width:160 };
    var prepCustomStyle = { marginRight: 5, marginBottom: -5, height: 32, width:135, position: 'absolute'};

    var subjectShowState = '';
    if(this.state.showSubject == true) {
      subjectShowState = '';
    } else {
      subjectShowState = 'disabled'
    }

    var prepositionTypeDefault = "preposition default";
    if(this.state.prepositionType==''){
      var prepositionTypeValue = "preposition" ;
    } else{
      if(this.state.customType){
        var prepositionTypeValue = 'customOption';
      } else{
        var prepositionTypeValue = this.state.prepositionType;
      }
    }

    var prepositionSubjectDefault = "object default";
    if(this.state.prepositionSubject==''){
      var prepositionSubjectValue = "subject" ;
    } else{
      if(this.state.customSubject && this.state.prepositionType!='--'){
        var prepositionSubjectValue = 'customOption';
      } else{
        var prepositionSubjectValue = this.state.prepositionSubject;
      }
    }
  
    var customOptionTypeText = '' ;
    var customOptionTypeTextInput='';
    var customOptionSubjectText = '';
    var customOptionSubjectTextInput='';

    if(this.state.customTypeText.length>0){

      customOptionTypeText=this.state.customTypeText;
      customOptionTypeTextInput=this.state.customTypeText;
    } else {
        customOptionTypeText = '[custom]';
    }

    if(this.state.customSubjectText.length>0){
      customOptionSubjectText=this.state.customSubjectText;
      customOptionSubjectTextInput=this.state.customSubjectText;
    } else {
      customOptionSubjectText = '[custom]';
    }

   

    if(this.state.editing == true) {
      if(this.state.customSubject == false) {
          if(this.state.customType == false) {
            return(
              <span style={wrapStyle}>
                <div style={wrapStyle}>

                <select className='soflow' ref='prepositionType' value={prepositionTypeValue} onChange={this.prepositionTypeChangeHandler} style={divStyle}>
                  <option value="preposition" disabled>{prepositionTypeDefault}</option>
                  <option value="~about">about</option>
                  <option value="~after">after</option>
                  <option value="~along">along</option>
                  <option value="~at">at</option>
                  <option value="~before">before</option>
                  <option value="~by">by</option>
                  <option value="~for">for</option>
                  <option value="~from">from</option>
                  <option value="~in">in</option>
                  <option value="~on">on</option>
                  <option value="~under">under</option>
                  <option value="~with">with</option>
                  <option value="~without">without</option>
                  <option value="customOption">{customOptionTypeText}</option>
                  <option value="--">--</option>
                </select>
              </div>
              <div style={wrapStyle}>

                <select className='soflow' ref='prepositionSubject' value={prepositionSubjectValue} onChange={this.prepositionSubjectChangeHandler} style={divStyle} disabled = {subjectShowState}>
                  <option value="subject" disabled>{prepositionSubjectDefault}</option>
                  <option value="someone">someone</option>
                  <option value="something">something</option>
                  <option value="somewhere">somewhere</option>
                  <option value="customOption">[custom object]</option>
                </select>
              </div>
          </span>

            );
              
            
          } else {
            return(
            <span style={wrapStyle}>
             <div style={wrapStyle}>
                <input ref='prepositionTypeCustom' rows="1" maxLength="50" cols="15" placeholder={customOptionTypeTextInput} onChange={this.prepositionCustomTypeChangeHandler} style={prepCustomStyle}></input>
                <select className='soflow' ref='prepositionType' value={prepositionTypeValue} onChange={this.prepositionTypeChangeHandler} style={divStyle}>
                  <option value="preposition" disabled>preposition</option>
                  <option value="~about">about</option>
                  <option value="~after">after</option>
                  <option value="~along">along</option>
                  <option value="~at">at</option>
                  <option value="~before">before</option>
                  <option value="~by">by</option>
                  <option value="~for">for</option>
                  <option value="~from">from</option>
                  <option value="~in">in</option>
                  <option value="~on">on</option>
                  <option value="~under">under</option>
                  <option value="~with">with</option>
                  <option value="~without">without</option>
                  <option value="customOption" selected>{customOptionTypeText}</option>
                  <option value="--">--</option>
                </select>
             </div>
             <div style={wrapStyle}>
                <select className='soflow' ref='prepositionSubject'   value={prepositionSubjectValue} onChange={this.prepositionSubjectChangeHandler} style={divStyle} disabled = {subjectShowState}>
                  <option value="subject" disabled>{prepositionSubjectDefault}</option>
                  <option value="someone">someone</option>
                  <option value="something">something</option>
                  <option value="somewhere">somewhere</option>
                  <option value="customOption">[custom object]</option>
                </select>
              </div>
          </span>

            );
        }
      } else {
         if(this.state.customType == false) {
          return(
          <span style={wrapStyle}>
            <div style={wrapStyle}>
              <select className='soflow' ref='prepositionType' value={prepositionTypeValue} onChange={this.prepositionTypeChangeHandler} style={divStyle}>
                <option value="preposition" disabled>{prepositionTypeDefault}</option>
                <option value="~about">about</option>
                <option value="~after">after</option>
                <option value="~along">along</option>
                <option value="~at">at</option>
                <option value="~before">before</option>
                <option value="~by">by</option>
                <option value="~for">for</option>
                <option value="~from">from</option>
                <option value="~in">in</option>
                <option value="~on">on</option>
                <option value="~under">under</option>
                <option value="~with">with</option>
                <option value="~without">without</option>
                <option value="customOption">{customOptionTypeText}</option>
                <option value="--">--</option>
              </select>
           </div>
           <div style={wrapStyle}>
              <input ref='prepositionSubjectCustom' rows="1" maxLength="50" cols="15" placeholder={customOptionSubjectTextInput} onChange={this.prepositionCustomSubjectChangeHandler}  style={prepCustomStyle} disabled = {subjectShowState}></input>
              <select className='soflow' ref='prepositionSubject' value={prepositionSubjectValue}  onChange={this.prepositionSubjectChangeHandler} style={divStyle} disabled = {subjectShowState}>
                <option value="subject" disabled>{prepositionSubjectDefault}</option>
                <option value="someone">someone</option>
                <option value="something">something</option>
                <option value="somewhere">somewhere</option>
                <option value="customOption" selected>{customOptionSubjectText}</option>
              </select>
            </div>
         </span>

          );
        } else {
            return (
            <span style={wrapStyle}>
              <div style={wrapStyle}>
                <input ref='prepositionTypeCustom' rows="1" maxLength="50" cols="15" placeholder={customOptionTypeTextInput} onChange={this.prepositionCustomTypeChangeHandler} style={prepCustomStyle}></input>
                <select className='soflow' ref='prepositionType' value={prepositionTypeValue} onChange={this.prepositionTypeChangeHandler} style={divStyle}>
                  <option value="preposition" disabled>{prepositionTypeDefault}</option>
                  <option value="about">about</option>
                  <option value="after">after</option>
                  <option value="along">along</option>
                  <option value="at">at</option>
                  <option value="before">before</option>
                  <option value="by">by</option>
                  <option value="for">for</option>
                  <option value="from">from</option>
                  <option value="in">in</option>
                  <option value="on">on</option>
                  <option value="under">under</option>
                  <option value="with">with</option>
                  <option value="without">without</option>
                  <option value="customOption">{customOptionTypeText}</option>
                  <option value="--">--</option>
                </select>
              </div>
              <div style={wrapStyle}>
                <input ref='prepositionSubjectCustom' rows="1" maxLength="50" cols="15" placeholder={customOptionSubjectTextInput} onChange={this.prepositionCustomSubjectChangeHandler} style={prepCustomStyle} disabled = {subjectShowState}></input>
                <select className='soflow' ref='prepositionSubject' value={prepositionSubjectValue} onChange={this.prepositionSubjectChangeHandler} style={divStyle} disabled = {subjectShowState}>
                  <option value="subject" disabled>{prepositionSubjectDefault}</option>
                  <option value="someone">someone</option>
                  <option value="something">something</option>
                  <option value="somewhere">somewhere</option>
                  <option value="customOption" selected>{customOptionSubjectText}</option>
                </select>
              </div>
            </span>

            );

        }
      }
    } else {

      if(this.state.prepositionType.includes("--")){
         <span style={wrapStyle}> "TEST" </span>
      } else {

        var prepositionType = this.state.prepositionType.replace('--', '').replace(/~/gi, '');
        var prepositionSubject = this.state.prepositionSubject.replace('--', '').replace(/~/gi, '');
        if(prepositionSubject.includes('subject')){prepositionSubject=''}
        return(
        <span style={wrapStyle}>
          {prepositionType} + " " + {prepositionSubject}
        </span>
      );

      }
   

    }
  }
});

/*
React component containing rendered consequence
*/
var ConsequenceComponent = React.createClass({ // fix 20 index button linking
  getInitialState: function() {

    var prepdefaultValue ='';

    return { 
             linking: false, // are we currently linking?
             linkList: [],   // words
             i:-1,           // temporary index of linked word
             colors:{},      // array of color links
             customSubject:false,
             customObject:false,
             prep: prepdefaultValue,
             consequenceSubject:'',
             consequenceObject:'',
             consequencePredicate:'',
             consequenceSubjectDefault:'',
             consequenceObjectDefault:'',
             customSubjectText:'',
             customObjectText:''
            }
  },

  setLink: function() { // i, j, grounding jth word of ith action
    if(this.props.alreadyLinking == false) {
      this.setState({linking: true});
      this.setState({linkList: this.props.cons.trim().split(" ")});
      $('#story').removeClass('noselect');
      $('#story').removeAttr( "disabled" )
      $('#story-ending').removeClass('noselect');
      $('#story-ending2').removeClass('noselect');
      this.props.toggleLink();
    }
  },
  
  link: function(i) {
    var word = this.state.linkList[i];
    this.refs.linked_element.value = word.replace(/~/gi, '');
    this.setState({i: i});
  },

  saveLink: function() {
    var color = new RColor;
    var c = color.get(true);
    var cols = this.state.colors;
    cols[this.state.i] = c;
    this.setState({colors: cols});
    if(this.props.selectedText == "") {
      alert('You have not selected anything from the story to ground to. It is recommended that you reground this word.');
    }
    this.props.addLink(20, this.state.i, this.props.selectedText,c);
    $('#story').addClass('noselect');
    $('#story').attr('disabled','disabled');
    $('#story-ending').addClass('noselect');
    this.setState({linking: false});
    this.props.toggleLink();
  },
  
  getData: function() {

    var d = {};
    //d['cPredicate'] = this.refs.consequencePredicate.value.trim();
    //d['cSubject'] = this.refs.consequenceSubject.value.trim();
    //d['cObject'] = this.refs.consequenceObject.value.trim();
    d['cPredicate'] = this.state.consequencePredicate;
    d['cSubject'] = this.state.consequenceSubject;
    d['cObject'] = this.state.consequenceObject;

    if(d['cObject']=='object'){
      d['cObject'] = "";
    }
    d['cPrepType'] = this.refs.cpcomp.getPrepPhrase()['pType'];
    d['cPrepObject'] = this.refs.cpcomp.getPrepPhrase()['pObject'];

    return(d);
  },


  resetCons: function(){
    this.setState(this.getInitialState());
    this.refs.consequencePredicate.value = '';
    this.refs.consequenceSubject.value='subject';
    this.refs.consequenceObject.value='object';
    for(var ref in this.refs) {
      if(ref.includes('cpcomp')) {
        this.refs['cpcomp'].resetPrepPhrase(this.props.index);

      }
    }
    this.forceUpdate();
  },
  
  
  subjectChange: function(event){
    if(event.target.value == 'customOption') {
      this.setState({customSubject: true});
    } else {
      this.setState({customSubject: false, consequenceSubject:event.target.value});
    }
    ReactDOM.render(<FooterInstructionComponent step={1} substep={1} r={5} />, document.getElementById('footer-instructions'));
  },

  subjectCustomChange: function(event){
    if(event.target.value.length > 0) {   
        this.setState({customSubjectText: event.target.value, consequenceSubject:event.target.value});
    }
  },

  objectChange: function(event){

    if(event.target.value == 'customOption') {
      this.setState({customObject: true});
    } else {
      this.setState({customObject: false, consequenceObject:event.target.value});
    }
    ReactDOM.render(<FooterInstructionComponent step={1} substep={1} r={6} />, document.getElementById('footer-instructions'));
  },

  objectCustomChange: function(event){
    if(event.target.value.length > 0) {   
      this.setState({customObjectText: event.target.value, consequenceObject:event.target.value});

    }  
  },

  predicateChange: function(event) {

  if(event.target.value.length > 0) {   
    this.setState({consequencePredicate:event.target.value});
  }
    ReactDOM.render(<FooterInstructionComponent step={1} substep={1} r={7} />, document.getElementById('footer-instructions'));
  },
  
  render: function() {
    var btnStyle = { marginLeft: 5, marginRight: 0, width:160 };
    var groundBtnStyle = { marginLeft: 5, marginRight: 0 };
    var wrapStyle = { display: 'inline-block' };
    var linkedElementStyle = { display: 'inline-block', width: 50, overflow:'hidden', marginBottom:-8, marginLeft:5 };
    var divStyle = { display: 'inline-block', margin: 5, marginBottom: -5, width:'auto' };
    var CustomStyle = { marginRight: 5, marginBottom: -5, height: 32, width:135, position: 'absolute'};

    var linkStyle = {marginTop: 40, textAlign: 'center' };
    var inlineBlock = { marginLeft:10 };
    var s = this.props.step;
    
    // Display grounding button depending if there exists an action we are currently linking
    if(s==1 || this.props.alreadyLinking == true || this.props.linkToggle == true) {
      groundBtnStyle['display'] = 'none';
    } else {
      groundBtnStyle['display'] = '';
    }
    
    var consequenceSubjectDefault = "subject default";
    if(this.state.consequenceSubject==''){
      var consequenceSubjectValue = "subject" ;
    } else{
      if(this.state.customSubject){
        var consequenceSubjectValue = 'customOption';
      } else{
        var consequenceSubjectValue = this.state.consequenceSubject;
      }
    }
    
    var consequenceObjectDefault = "object default";
    if(this.state.consequenceObject==''){
      var consequenceObjectValue = "object" ;
    } else{
      if(this.state.customObject){
        var consequenceObjectValue = 'customOption';
      } else{
        var consequenceObjectValue = this.state.consequenceObject;
      }
    }


    var customOptionSubjectText = '' ;
    var customOptionSubjectTextInput='';
    var customOptionObjectText = '';
    var customOptionObjectTextInput='';

    if(this.state.customSubjectText.length>0){
      customOptionSubjectText=this.state.customSubjectText;
      customOptionSubjectTextInput=this.state.customSubjectText;
    } else {
        customOptionSubjectText = '[custom]';
    }

    if(this.state.customObjectText.length>0){
      customOptionObjectText=this.state.customObjectText;
      customOptionObjectTextInput=this.state.customObjectText;
    } else {
      customOptionObjectText = '[custom]'
    }

    if(this.props.edit == true) {
      if(this.state.customSubject == true && this.state.customObject == false) {
        return(
          <span className='consequence-container' style={inlineBlock}>
          <div style={wrapStyle}>

            <input ref='consequenceSubjectCustom' rows="1" maxLength="50" cols="10" placeholder={customOptionSubjectTextInput} onChange={this.subjectCustomChange}  style={CustomStyle}></input>
            <select className='soflow' ref='consequenceSubject' value={consequenceSubjectValue} onChange={this.subjectChange} style={btnStyle}>
              <option value="subject" disabled>{consequenceSubjectDefault}</option>
              <option value="someone">someone</option>
              <option value="something">something</option>
              <option value="somewhere">somewhere</option>
              <option value="customOption" selected>{customOptionSubjectText}</option>
            </select>
          </div>

          <div style={wrapStyle}>
            <input ref='consequencePredicate' rows="1" maxLength="50" cols="15" placeholder="consequence" onChange={this.predicateChange} style={divStyle}></input>
          </div>
 
          <div style={wrapStyle}> 
            <select className='soflow' ref='consequenceObject' value={consequenceObjectValue} onChange={this.objectChange} style={btnStyle}>
              <option value="object" disabled>{consequenceObjectDefault}</option>
              <option value="someone">someone</option>
              <option value="something">something</option>
              <option value="somewhere">somewhere</option>
              <option value="--">--</option>
              <option value="customOption">[custom object]</option>
            </select>
          </div>
            <PrepphraseComponent
                  ref='cpcomp'
                  editing={true}
                  defaultPrep={this.state.prep}
            />
          </span>
        );
      } else if (this.state.customSubject == false && this.state.customObject == true) {
        return(
          <span className='consequence-container' style={inlineBlock}>
            <div style={wrapStyle}>
            <select className='soflow' ref='consequenceSubject' value={consequenceSubjectValue} onChange={this.subjectChange} style={btnStyle}>
              <option value="subject" disabled>{consequenceSubjectDefault}</option>
              <option value="someone">someone</option>
              <option value="something">something</option>
              <option value="somewhere">somewhere</option>
              <option value="customOption">[custom object]</option>
            </select>
            </div>
            <div style={wrapStyle}>
              <input ref='consequencePredicate' rows="1" maxLength="50" cols="15" placeholder="consequence" onChange={this.predicateChange}  style={divStyle}></input>
            </div>            
            <div style={wrapStyle}>
              <input ref='consequenceObjectCustom' rows="1" maxLength="50" cols="10" placeholder={customOptionObjectTextInput} onChange={this.objectCustomChange} style={CustomStyle}></input>
              <select className='soflow' ref='consequenceObject' value={this.state.consequenceObject} value={consequenceObjectValue} onChange={this.objectChange} style={btnStyle}>
                <option value="object" disabled>{consequenceObjectDefault}</option>
                <option value="someone">someone</option>
                <option value="something">something</option>
                <option value="somewhere">somewhere</option>
                <option value="--">--</option>
                <option value="customOption" selected>{customOptionObjectText}</option>
              </select>
            </div>
            
            <PrepphraseComponent
                  ref='cpcomp'
                  editing={true}
                  defaultPrep={this.state.prep}
            />
          </span>
        );
      } else if (this.state.customSubject == true && this.state.customObject == true) {
        return(
          <span className='consequence-container' style={inlineBlock}>
            <div style={wrapStyle}>
              <input ref='consequenceSubjectCustom' rows="1" maxLength="50" cols="10" placeholder={customOptionSubjectTextInput} onChange={this.subjectCustomChange} style={CustomStyle}></input>
              <select className='soflow' ref='consequenceSubject' value={consequenceSubjectValue} onChange={this.subjectChange} style={btnStyle}>
                <option value="subject" disabled>{consequenceSubjectDefault}</option>
                <option value="someone">someone</option>
                <option value="something">something</option>
                <option value="somewhere">somewhere</option>
                <option value="customOption" selected>{customOptionSubjectText}</option>
              </select>
            </div> 
            <div style={wrapStyle}>
              <input ref='consequencePredicate' rows="1" maxLength="50" cols="15" placeholder="consequence" onChange={this.predicateChange} style={divStyle}></input>
            </div>
            <div style={wrapStyle}>
              <input ref='consequenceObjectCustom' rows="1" maxLength="50" cols="10" placeholder={customOptionObjectTextInput}  onChange={this.objectCustomChange} style={CustomStyle}></input>
              <select className='soflow' ref='consequenceObject' value={consequenceObjectValue} onChange={this.objectChange} style={btnStyle}>
                <option value="object" disabled>{consequenceObjectDefault}</option>
                <option value="someone">someone</option>
                <option value="something">something</option>
                <option value="somewhere">somewhere</option>
                <option value="--">--</option>
                <option value="customOption" selected>{customOptionObjectText}</option>
              </select>
            </div>

            <PrepphraseComponent
                  ref='cpcomp'
                  editing={true}
                  defaultPrep={this.state.prep}
            />

          </span>
        );
      } else {
        return(
          <span className='consequence-container' style={inlineBlock}>
            <div style={wrapStyle}>
            <select className='soflow' ref='consequenceSubject' value={consequenceSubjectValue} onChange={this.subjectChange} style={btnStyle}>
              <option value="subject" disabled>{consequenceSubjectDefault}</option>
              <option value="someone">someone</option>
              <option value="something">something</option>
              <option value="somewhere">somewhere</option>
              <option value="customOption">[custom]</option>
            </select>
            </div>
            <div style={wrapStyle}>
              <input ref='consequencePredicate' rows="1" maxLength="50" cols="15" placeholder="consequence" onChange={this.predicateChange} style={divStyle}></input>
            </div>
            <div style={wrapStyle}>
            <select className='soflow' ref='consequenceObject' value={consequenceObjectValue} onChange={this.objectChange} style={btnStyle}>
              <option value="object" disabled>{consequenceObjectDefault}</option>
              <option value="someone">someone</option>
              <option value="something">something</option>
              <option value="somewhere">somewhere</option>
              <option value="--">--</option>
              <option value="customOption">[custom]</option>
            </select>
            </div>


          <PrepphraseComponent
                  ref='cpcomp'
                  editing={true}
                  defaultPrep={this.state.prep}
          />
          </span>
        );
      }
    } else {
      // if the step is 2, display the grounding buttons and remove the rule manipulation buttons
      if(this.state.linking == true && this.props.step == 2){
        return (
          <div style = {wrapStyle}>
            <div style={linkStyle}>
              <textarea ref='linked_element' rows="1" maxLength="50" placeholder="Linked Element" style={linkedElementStyle} disabled></textarea>
              <span> ==></span>
              <textarea ref='ground' rows="1" maxLength="50" placeholder="Story" value={this.props.selectedText} style={linkedElementStyle} disabled></textarea>
              <button onClick={this.saveLink} className='btn btn-xs link-btn btn-success' style={btnStyle}>submit</button>
            </div>
            <div className="actionText" style={divStyle}>
            {
              this.state.linkList.map(function(word, i) {
                word = word.replace('--', '').replace(/~/gi, '').replace('subject','');
                if (stopWordList.includes(word) || defaultPrepositions.includes(word)) { // word is a stopword or has already been grounded
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
              <button onClick={this.setLink} className='btn btn-xs link-btn' style={groundBtnStyle}>Ground to Story</button>
            </div>
              <div ref='consequenceText' className='consequenceText' style={divStyle}>{
                this.props.cons.split(" ").map(function(word, i) {
                  word = word.replace('--', '').replace(/~/gi, '').replace('subject','');
                  var colStyle = {color: this.state.colors[i]}
                  return(<span key={i} style={colStyle}>{word} </span>);
                },this)
              }
              </div>
          </div>
        );
      }
    }
  }
});

/*
React premise component
*/
var PremiseComponent = React.createClass({
  getInitialState: function() {
    
    if(this.props.adefaultValue.trim().slice(-1)[0]  == '--') { // if preposition chosen
      var adefaultValue = this.props.adefaultValue.slice(0, -1);
      var prepdefaultValue = ''
    } else {
      var adefaultValue = this.props.adefaultValue.substring(0, this.props.adefaultValue.indexOf('~'));
      var prepdefaultValue = this.props.adefaultValue.substring(this.props.adefaultValue.indexOf('~'), this.props.adefaultValue.length);
    }

    var customVal = false;
    if(this.props.predicateIndex == 0) {
        customVal = true;
        var pcv = 'subject'
    } else {  
        customVal = false;
        if(this.props.edit == true) {
          var pcv = this.props.consList[0] 
      } else {
        var pcv = 'subject'
      }
    }

    return { op: this.props.opdefaultValue, // default operator value for this premise
             //act: this.props.adefaultValue, // default predicate value for this premise
             act: adefaultValue,
             prep: prepdefaultValue,
             customValue: customVal,        // does the worker want to write his own premise?
             customObject: false,
             customSubject: false,
             customCustomValue: false,
             linking: false,                // are we linking this premise?
             linkList: [],                  // list of words
             i:-1,                          // index for linked word
             colors: [],                     // set of colors for linked words
             premiseSubject:'',
             premiseObject:'',
             premisePredicate:'',
             premiseSubjectDefault:'',
             premiseObjectDefault:'',
             customSubjectText:'',
             customObjectText:'',
             premiseCustomValue: pcv,
            }
  },
  
  getAction: function() {

    if(this.state.customValue == true){

      var actionSubject = this.state.premiseSubject;
      var actionPredicate = this.state.premisePredicate;
      var actionObject = this.state.premiseObject;

      if(actionObject=='object'){
        actionObject="";
      }

      var prepPhrase = this.refs.ppcomp.getPrepPhrase();
      return(actionSubject + " " + actionPredicate + " " + actionObject + " " + prepPhrase['pType'] + " " + prepPhrase['pObject']);
    
    } else {
      var action = this.state.premiseCustomValue;
      return(action);
  }


  },





  actionCheck: function (){
    var actionsTest = [] 
    if(this.state.customValue == true){
      var actionSubject = this.refs.actionSubject.value;
      var actionPredicate = this.refs.actionPredicate.value;
      var actionObject = this.refs.actionObject.value;
   

      if(actionSubject=='subject'){
        actionSubject="";
      }

      if(actionObject=='object'){
        actionObject="";
      }

      actionsTest.push(actionSubject.length>0);
      actionsTest.push(actionPredicate.length>0);
      actionsTest.push(actionObject.length>0);


    } else {

      actionsTest.push(true);
      actionsTest.push(true);
      actionsTest.push(true);

    }

    return(actionsTest)
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
    this.setState({premiseCustomValue: event.target.value});
    }
  },

  setLink: function() { // i, j, grounding jth word of ith action
    if(this.props.alreadyLinking == false) {
      this.setState({linking: true});
      var action = this.state.act.trim()+" " +this.state.prep.trim()
      this.setState({linkList: action.trim().split(" ")});
      $('#story').removeClass('noselect');
      $('#story').removeAttr( "disabled" )
      $('#story-ending').removeClass('noselect');
      $('#story-ending2').removeClass('noselect');
      this.props.toggleLink();
    }
  },

  link: function(i) {
    this.setState({i: i});
    var word = this.state.linkList[i];
    ReactDOM.render(<FooterInstructionComponent step={2} substep={1} r={2} />, document.getElementById('footer-instructions'));
    this.refs.linked_element.value= word.replace(/~/gi, ''); // replace prep tag
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
      alert('You have not selected anything from the story to ground to. It is recommended that you reground this word.');
    }

    this.props.addLink(this.props.index, this.state.i, this.props.selectedText,c);
    $('#story').addClass('noselect');
    $('#story').attr('disabled','disabled');
    $('#story-ending').addClass('noselect');
    $('#story-ending2').addClass('noselect');
    ReactDOM.render(<FooterInstructionComponent step={2} substep={1} r={5} />, document.getElementById('footer-instructions'));
    this.setState({linking: false});
    this.props.toggleLink();
  },
  
  removePremise: function() {
    this.props.removePremise(this.props.index);
  },

  resetPremise: function(){
    if(this.state.customValue==true){
    this.setState(this.getInitialState());
    this.refs.actionPredicate.value = '';
    this.refs.actionSubject.value='subject';
    this.refs.actionObject.value='object';
    this.refs.op.value='and'
    for(var ref in this.refs) {
      if(ref.includes('ppcomp')) {
        this.refs["ppcomp"].resetPrepPhrase(this.props.index);

      }
    }

    this.forceUpdate();
    } else {

    this.setState({premiseCustomValue: 'subject'});

    }
  },


subjectChange: function(event){
    if(event.target.value == 'customOption') {
      this.setState({customSubject: true});
    } else {
      this.setState({customSubject: false, premiseSubject:event.target.value});
      ReactDOM.render(<FooterInstructionComponent step={1} substep={1} r={2} />, document.getElementById('footer-instructions'));

    }
  },

  subjectCustomChange: function(event){
    if(event.target.value.length > 0) {   
        this.setState({customSubjectText: event.target.value, premiseSubject:event.target.value});
        ReactDOM.render(<FooterInstructionComponent step={1} substep={1} r={2} />, document.getElementById('footer-instructions'));

    }
  },

  objectChange: function(event){

    if(event.target.value == 'customOption') {
      this.setState({customObject: true});
    } else {
      this.setState({customObject: false, premiseObject:event.target.value});
      ReactDOM.render(<FooterInstructionComponent step={1} substep={1} r={3} />, document.getElementById('footer-instructions'));

    }
  },

  objectCustomChange: function(event){
    if(event.target.value.length > 0) {   
      this.setState({customObjectText: event.target.value, premiseObject:event.target.value});
      ReactDOM.render(<FooterInstructionComponent step={1} substep={1} r={3} />, document.getElementById('footer-instructions'));

    }  
  },

  predicateChange: function(event) {
    if(event.target.value.length > 0) {   
    this.setState({premisePredicate: event.target.value});
  }
    ReactDOM.render(<FooterInstructionComponent step={1} substep={1} r={4} />, document.getElementById('footer-instructions'));

  },

  render: function() {
    var btnStyle = { marginLeft: 5, marginRight: 0, width:160 };
    var objectStyle = {marginRight:5, width:160}; //marginRight: 5
    var groundBtnStyle = { marginLeft: 5, marginRight: 0};
    var wrapStyle = { display: 'inline-block', marginBottom: 15};
    var linkedElementStyle = { display: 'inline-block', width: 50, overflow:'hidden', marginBottom:-8, marginLeft:5 };
    var divStyle = { display: 'inline-block', margin: 5, marginBottom: -5, width:'auto' };
    var linkStyle = { marginTop: -25, textAlign: 'center' };
    var formStyle = { width:120, marginRight: 50 };
    var removePremiseStyle = {marginTop: -20};
    var selectStyle = {}
    var CustomStyle = { marginRight: 5, marginBottom: -5, height: 32, width:135, position: 'absolute'};

    
    if(this.props.index == this.props.numActions-1) {selectStyle = {display: 'none'};} else {selectStyle={};}
    if(this.props.numActions == 1) {removePremiseStyle={display: 'none'}}else {removePremiseStyle={};}

    var s = this.props.step;
    if(s==1 || this.props.alreadyLinking == true || this.props.linkToggle == true) {
      groundBtnStyle['display'] = 'none';
    } else {
      groundBtnStyle['display'] = '';
    }
    
    //var act = this.state.act.trim()

    var premiseSubjectDefault = "subject default";
    if(this.state.premiseSubject==''){
      var premiseSubjectValue = "subject" ;
    } else{
      if(this.state.customSubject){
        var premiseSubjectValue = 'customOption';
      } else{
        var premiseSubjectValue = this.state.premiseSubject;
      }
    }
    
    var premiseObjectDefault = "object default";
    if(this.state.premiseObject==''){
      var premiseObjectValue = "object" ;
    } else{
      if(this.state.customSubject){
        var premiseObjectValue = 'customOption';
      } else{
        var premiseObjectValue = this.state.premiseObject;
      }
    }
    var actionPredicateDefault=""

    var customOptionSubjectText = '' ;
    var customOptionSubjectTextInput='';
    var customOptionObjectText = '';
    var customOptionObjectTextInput='';

    if(this.state.customSubjectText.length>0){
      customOptionSubjectText=this.state.customSubjectText;
      customOptionSubjectTextInput=this.state.customSubjectText;
    } else {
        customOptionSubjectText = '[custom]';
    }

    if(this.state.customObjectText.length>0){
      customOptionObjectText=this.state.customObjectText;
      customOptionObjectTextInput=this.state.customObjectText;
    } else {
      customOptionObjectText = '[custom]'
    }


    if(this.props.edit == true) {
      if (this.state.customValue == true || this.props.predicateIndex == 0) { // no options to chose from
        if(this.state.customSubject == true && this.state.customObject == false) {
          return(
            <div style={wrapStyle}>
              <div style={linkStyle}>
                <button onClick={this.removePremise} style={removePremiseStyle} className='btn btn-xs save-predicate-btn'>Remove Premise</button>
              </div>
              
              <div style = {wrapStyle}>
                <input ref='actionSubjectCustom' rows="1" maxLength="50" cols="10" placeholder={customOptionSubjectTextInput} onChange={this.subjectCustomChange} style={CustomStyle} onBlur={this.onBlurHandler}></input>
                <select className='soflow' ref='actionSubject' value={premiseSubjectValue} onChange={this.subjectChange} style={btnStyle}>
                  <option value="subject" disabled>{premiseSubjectDefault}</option>
                  <option value="someone">someone</option>
                  <option value="something">something</option>
                  <option value="somewhere">somewhere</option>
                  <option value="customOption">{customOptionSubjectText}</option>
                </select>
              </div>
              <div style = {wrapStyle}>
                <input ref='actionPredicate' rows="1" maxLength="50" cols="15" placeholder="action" onChange={this.predicateChange} style={divStyle}></input>
              </div>
              <div style = {wrapStyle}>
                <select className='soflow' ref='actionObject' value={premiseObjectValue} onChange={this.objectChange} style={objectStyle}>
                  <option value="object" disabled>{premiseObjectDefault}</option>
                  <option value="someone">someone</option>
                  <option value="something">something</option>
                  <option value="somewhere">somewhere</option>
                  <option value="--">-</option>
                  <option value="customOption">[custom object]</option>
                </select>
              </div>

                <PrepphraseComponent
                  ref='ppcomp'
                  editing={true}
                  defaultPrep={this.state.prep}
                />
                
                <select className='soflow' ref='op' style={selectStyle} defaultValue={this.props.opdefaultValue} onChange={this.opChangeHandler}>
                  <option value="and">and</option>
                  <option value="or">or</option>
                </select>
            </div>
          );
        } else if(this.state.customSubject == false && this.state.customObject == true) {
          return(
            <div style={wrapStyle}>

              <div style={linkStyle}>
                <button onClick={this.removePremise} style={removePremiseStyle} className='btn btn-xs save-predicate-btn'>Remove Premise</button>
              </div>
              
              <div style = {wrapStyle}>
                <select className='soflow' ref='actionSubject' value={premiseSubjectValue} onChange={this.subjectChange} style={btnStyle}>
                  <option value="subject" disabled>{premiseSubjectDefault}</option>
                  <option value="someone">someone</option>
                  <option value="something">something</option>
                  <option value="somewhere">somewhere</option>
                  <option value="customOption">[custom subject]</option>
                </select>
              </div>

              <div style = {wrapStyle}>
                <input ref='actionPredicate' rows="1" maxLength="50" cols="15" placeholder="action" onChange={this.predicateChange} style={divStyle} onBlur={this.onBlurHandler}></input>
              </div>

              <div style = {wrapStyle}>
                <input ref='actionObjectCustom' rows="1" maxLength="50" cols="10" placeholder={customOptionObjectTextInput} onChange={this.objectCustomChange} style={CustomStyle}></input>
                <select className='soflow' ref='actionObject' value={premiseObjectValue} onChange={this.objectChange} style={btnStyle}>
                  <option value="object" disabled>{premiseObjectDefault}</option>
                  <option value="someone">someone</option>
                  <option value="something">something</option>
                  <option value="somewhere">somewhere</option>
                  <option value="--">-</option>
                  <option value="customOption">{customOptionObjectText}</option>
                </select>
              </div>

                <PrepphraseComponent
                  ref='ppcomp'
                  editing={true}
                  defaultPrep={this.state.prep}
                />
                
                <select className='soflow' ref='op' style={selectStyle} defaultValue={this.props.opdefaultValue} onChange={this.opChangeHandler}>
                  <option value="and">and</option>
                  <option value="or">or</option>
                </select>
            </div>
          );
        } else if(this.state.customSubject == true && this.state.customObject == true) {
          return(
            <div style={wrapStyle}>

              <div style={linkStyle}>
                <button onClick={this.removePremise} style={removePremiseStyle} className='btn btn-xs save-predicate-btn'>Remove Premise</button>
              </div>

              <div style = {wrapStyle}>
                <input ref='actionSubjectCustom' rows="1" maxLength="50" cols="10" placeholder={customOptionSubjectTextInput} onChange={this.subjectCustomChange} style={CustomStyle} onBlur={this.onBlurHandler}></input>
                <select className='soflow' ref='actionSubject' value={premiseSubjectValue} onChange={this.subjectChange} style={btnStyle}>
                    <option value="subject"  disabled>{premiseSubjectDefault}</option>
                    <option value="someone">someone</option>
                    <option value="something">something</option>
                    <option value="somewhere">somewhere</option>
                    <option value="customOption">{customOptionSubjectText}</option>
                  </select>
              </div>

              <div style = {wrapStyle}>
                 <input ref='actionPredicate' rows="1" maxLength="50" cols="15" placeholder="action" onChange={this.predicateChange} style={divStyle} onBlur={this.onBlurHandler}></input>
              </div>

              <div style = {wrapStyle}>
                <input ref='actionObjectCustom' rows="1" maxLength="50" cols="10" placeholder={customOptionObjectTextInput} onChange={this.objectCustomChange} style={CustomStyle}></input>
                <select className='soflow' ref='actionObject' value={premiseObjectValue} onChange={this.objectChange} style={btnStyle}>
                   <option value="object" disabled>{premiseObjectDefault}</option>
                   <option value="someone">someone</option>
                   <option value="something">something</option>
                   <option value="somewhere">somewhere</option>
                   <option value="--">-</option>
                   <option value="customOption">{customOptionObjectText}</option>
                  </select>
              </div>

                <PrepphraseComponent
                  ref='ppcomp'
                  editing={true}
                  defaultPrep={this.state.prep}
                />
                
                <select className='soflow' ref='op' style={selectStyle} defaultValue={this.props.opdefaultValue} onChange={this.opChangeHandler}>
                  <option value="and">and</option>
                  <option value="or">or</option>
                </select>
            </div>
          );
        } else {
          return(
            <div style={wrapStyle}>
              <div style={linkStyle}>
                <button onClick={this.removePremise} style={removePremiseStyle} className='btn btn-xs save-predicate-btn'>Remove Premise</button>
              </div>
              
              <div style = {wrapStyle}>
                <select className='soflow' ref='actionSubject' value={premiseSubjectValue} onChange={this.subjectChange} style={btnStyle}>
                  <option value="subject" disabled>{premiseSubjectDefault}</option>
                  <option value="someone">someone</option>
                  <option value="something">something</option>
                  <option value="somewhere">somewhere</option>
                  <option value="customOption">[custom subject]</option>
                </select>
              </div>

              <div style = {wrapStyle}>
                <input ref='actionPredicate' rows="1" maxLength="50" cols="15" placeholder="action" onChange={this.predicateChange} style={divStyle} onBlur={this.onBlurHandler}></input>
              </div>

              <div style = {wrapStyle}>
                <select className='soflow' ref='actionObject' value={premiseObjectValue} onChange={this.objectChange} style={objectStyle}>
                  <option value="object" disabled>{premiseObjectDefault}</option>
                  <option value="someone">someone</option>
                  <option value="something">something</option>
                  <option value="somewhere">somewhere</option>
                  <option value="--">--</option>
                  <option value="customOption">[custom object]</option>
                </select>
              </div>

              <PrepphraseComponent
                ref='ppcomp'
                editing={true}
                defaultPrep={this.state.prep}
              />
              
              <select className='soflow' ref='op' style={selectStyle} defaultValue={this.props.opdefaultValue} onChange={this.opChangeHandler}>
                <option value="and">and</option>
                <option value="or">or</option>
              </select>
            </div>
          );
        }
      } else { // using dropdown premise
        return (
          <div style={wrapStyle}>
            <div style={linkStyle}>
              <button onClick={this.removePremise} style={removePremiseStyle} className='btn btn-xs save-predicate-btn'>Remove Premise</button>
            </div>
            <div style={wrapStyle}>
              <select ref='action' style={divStyle} value={this.state.premiseCustomValue} onChange={this.actChangeHandler}>
                  <option selected="selected" disabled>premise</option>
                  {
                  this.props.consList.map(function(consequence) {
                    var cons = consequence.replace('--', '').replace('subject','');
                    var consClean = consequence.replace(/--/gi, '').replace(/~/gi, '').replace(/subject/gi,'')
                    return(<option key={cons}
                      value={cons}>{consClean}</option>);
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
              <textarea ref='ground' rows="1" maxLength="50" placeholder="Story" value={this.props.selectedText} style={linkedElementStyle} onChange={this.contextChange} disabled></textarea>
              <button onClick={this.saveLink} className='btn btn-xs link-btn btn-success' style={btnStyle}>submit</button>
            </div>
            <div className="actionText" style={divStyle}>
            {
              this.state.linkList.map(function(word, i) {
                word = word.replace('--', '').replace(/~/gi, '').replace('subject','');
                if (stopWordList.includes(word) || defaultPrepositions.includes(word)) { // word is a stopword or has already been grounded
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
      } else { // not editing and step 3
          return(
            <div style = {wrapStyle}>
              <div style={linkStyle}>
                <button ref="linkBtn" onClick={this.setLink} className='btn btn-xs link-btn' style={groundBtnStyle}>Ground to Story</button>
              </div>
              <div style = {wrapStyle}>
                <div className="actionText" style={divStyle}>
                {
                  this.props.adefaultValue.split(" ").map(function(word, i) {
                    var colStyle = {color: this.state.colors[i]}
                    word = word.replace('--', '').replace(/~/gi, '').replace('subject','');
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
React component for complete rule premise -> consequence
*/
var RuleComponent = React.createClass({
  getInitialState: function() {
    return { editing: true,
             actions: [],
             ops:[],
             linking: false,
             ruleArray: [],
             cons: '' }
  },

  edit: function() {
    
    this.props.toggleEdit();
    ReactDOM.render(<FooterInstructionComponent step={1} substep={1} r={-1}/>, document.getElementById('footer-instructions'));
    this.setState({editing: true});
  },

  remove: function() {
    if (this.props.numPreds > 0) {
      this.props.removePredicate(this.props.index);
    } else {
      alert("Must provide at least one implication.");
      return false;
    }
  },

  save: function() {
    ReactDOM.render(<FooterInstructionComponent step={1} substep={1} r={9} />, document.getElementById('footer-instructions'));
    var actions = [];
    var ops = [];
    var actionsTests = [];

    for(var ref in this.refs) {
      if(ref.includes('action')) {
        actions.push(this.refs[ref].getAction());
        ops.push(this.refs[ref].getOp());
        actionsTests.push(this.refs[ref].actionCheck());
      }
    }


    function isFalse(element, index, array) {
        return element==false;
    }

    
    var consequence = this.refs.consequence.getData();
    var consequencePredicate = consequence['cPredicate']
    var consequenceSubject = consequence['cSubject']
    var consequenceObject = consequence['cObject']
    var consequencePrepType = consequence['cPrepType']
    var consequencePrepObject = consequence['cPrepObject']

    if(this.props.index > 0 && consequencePredicate=="" && consequenceSubject=="" && consequenceObject=="" && actions.join().trim() == "") { // discard empty inference rules
      this.props.toggleEdit();
      this.setState({editing: false});
      this.remove();
      return false;
    }

    for (var i=0;i<actionsTests.length;i++) {
      var alertString="Can't leave empty fields in premise.";
      if(actionsTests[i][0]==false || actionsTests[i][1]==false || actionsTests[i][2]==false || consequenceSubject == "" || consequencePredicate == "" || consequenceObject == "") { // partially complete form
        

      if(actionsTests[i][0]==false || actionsTests[i][1]==false || actionsTests[i][2]==false ) { 
        var num = i+1; 
        alertString+= " To premise" + num +" add: ";
        if(actionsTests[i][0]==false){
          alertString += "a subject ";
        } if(actionsTests[i][1]==false) {
          alertString += "an action ";
        } if(actionsTests[i][2]==false) {
          alertString += "an object or choose the -- for no option ";
        }
        alertString += ".";

      }
      if(consequenceSubject == "" || consequencePredicate == "" || consequenceObject == "") { 
        alertString+= " To the consequence add: ";
        if(consequenceSubject == ""){
          alertString += "a subject ";
        } if(consequencePredicate == "") {
          alertString += "an action ";
        } if(consequenceObject == "") {
          alertString += "an object or choose the -- for no option ";
        }
        alertString += ".";

      }

        alert(alertString);
        return false;
      }
    }

    this.props.toggleEdit();
    this.props.updatePredicate(actions, ops, consequenceSubject + " " + consequencePredicate + " " + consequenceObject + " " + consequencePrepType + " " + consequencePrepObject, this.props.index);
    var cons ='';
 
    cons = consequenceSubject + " " + consequencePredicate + " " + consequenceObject + " " + consequencePrepType + " " + consequencePrepObject;
    this.setState({cons: cons});
    this.setState({editing: false});
  },
  
  resetRule: function() {
    for(var ref in this.refs) {
      if(ref.includes('action')) {
        //this.refs[ref].resetPremise(this.props.index);
      } 
      if(ref.includes('consequence')){
        //this.refs[ref].resetCons(this.props.index);
      }
    }
    ReactDOM.render(<FooterInstructionComponent step={1} substep={1} r={1} />, document.getElementById('footer-instructions'));

  },

  addPremise: function() {
    var actions = this.state.actions;
    actions.push("");
    ReactDOM.render(<FooterInstructionComponent step={1} substep={1} r={2} />, document.getElementById('footer-instructions'));
    this.setState({actions: actions});
    this.props.addPremise(this.props.index);
  },
  
  removePremise: function(i) { // ith premise
    this.props.removePremise(this.props.index,i);
  },

  addLink: function(i, j, grounding,c) { // jth word of ith action and color
    this.props.addLink(this.props.index, i, j, grounding, c);
  },
  
  add: function() {
    if(this.props.cons == null || this.props.cons == ''){alert("Please complete elements of this rule."); return(false);}
    this.props.addPredicate();
    this.setState({editing: false});
  },

  updateNL: function() {
    this.props.updateNL();
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
    var editBtnStyle = { display: 'inline-block', margin: 5, backgroundColor:'#008CBA' };
    var removeBtnStyle = { display: 'inline-block', margin: 5, backgroundColor:'red' };

    var btnStyle = { display: btnVisibility, margin: 5};
    var font = { fontSize: 50};


    if(this.props.step==2) {
      return (
        <div className='predicate'>
        <div><b>{'Logical rule ' + (this.props.index+1) + ':'}</b></div>
        <div className='premise-container' style={divStyle}>
        {
          this.props.act.map(function(action, i) {
            return (
              <PremiseComponent
                key={i}
                index={i}
                predicateIndex={i}
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
          ref="consequence"
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
          <div><b>{'Logical rule ' + (this.props.index+1) + ':'}</b></div>
          <div className='premise-container' style={divStyle}>
          {
            this.props.act.map(function(action, i) {
              return (
                <PremiseComponent
                  key={i}
                  index={i}
                  predicateIndex={i}
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
          <ConsequenceComponent
            ref="consequence"
            cons={this.props.cons}
            step={this.props.step}
            addLink={this.addLink}
            selectedText={this.props.selectedText}
            contextLinks={this.props.contextLinks[20]}>
          </ConsequenceComponent>
          <hr></hr>
          </div>
          );
      } else {


        return (
          <div className='predicate'>
          <div><b>{'Logical rule ' + (this.props.index+1) + ':'}</b></div>
          <div className='premise-container' style={divStyle}>
          {
            this.props.act.map(function(action, i) {
              return (
                <PremiseComponent
                  key={i}
                  index={i}
                  predicateIndex={i}
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
          <ConsequenceComponent
            ref="consequence"
            cons={this.props.cons}
            step={this.props.step}
            edit={this.state.editing}
            addLink={this.addLink}
            selectedText={this.props.selectedText}
            contextLinks={this.props.contextLinks[20]}>
          </ConsequenceComponent>
          <button onClick={this.edit} className='btn btn-xs edit-predicate-btn' style={editBtnStyle}>Edit Rule</button>
          <button onClick={this.remove} className='btn btn-xs remove-predicate-btn' style={removeBtnStyle}>Remove Rule</button>
          <hr></hr>
          </div>
          );
        }
      }
  },

  renderForm: function() {

    var divStyle = { display: 'inline-block', margin: 5, marginBottom: -5 };
    var inlineBlock = { marginLeft:10 };
    var saveBtnStyle ={ marginLeft:10, backgroundColor:'#008CBA'  };
    var btnStyle = { display: 'inline-block', marginLeft: 5, marginRight:-10, backgroundColor:'#4CAF50' };
    var wrapStyle = { display: 'inline-block' };
    var impliesStyle = {marginLeft: 50 };

    
    var consequenceSubjectDefault = this.props.cons.split(" ")[0];
    //var consequencePredicateDefault = this.props.cons.split(" ").slice(1, -1).join(" ");


    if(this.props.cons.substring(1, this.props.cons.indexOf('~'))!=""){
      var consequencePredicateDefault = this.props.cons.substring(1, this.props.cons.indexOf('~')).split(" ").slice(0, -1).join(" ");
      var consequenceObjectDefault = this.props.cons.substring(1, this.props.cons.indexOf('~'))[0].split(" ").slice(-1);

    } else {var consequencePredicateDefault = "";
            var consequenceObjectDefault = ""; 
    }

    return (
      <div className='predicate'>
        <div><b>{'Logical rule ' + (this.props.index+1) + ':'}</b></div>
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
                removePremise={this.removePremise}
                actions={this.props.act}
                op={this.props.op}>
              </PremiseComponent>
              );
          }, this)
        }
        </span>
        <div style={impliesStyle}><b>implies&nbsp;&nbsp;</b>
        <ConsequenceComponent
          ref="consequence"
          cons={this.props.cons}
          step={this.props.step}
          edit={this.state.editing}
          addLink={this.addLink}
          selectedText={this.props.selectedText}
          consequenceSubjectDefault = {consequenceSubjectDefault}
          consequencePredicateDefault = {consequencePredicateDefault}
          consequenceObjectDefault = {consequenceObjectDefault}
          contextLinks={this.props.contextLinks[20]}
          cons={this.props.cons}>
        </ConsequenceComponent>
        <button onClick={this.save} className='btn btn-xs save-predicate-btn' style={saveBtnStyle}>Save</button>
        <button onClick={this.resetRule} className='btn btn-xs save-predicate-btn' style={saveBtnStyle}>Reset</button>
        </div>
        <hr></hr>
      </div>
    );
  },

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
                        [ // predicates
                          [""],[""], "", [[],[]] // action list, op list, consequence, list of groundings- per word
                        ]
                      ];
    predicates[0][3][20] = [""];
    return {
      predicates: predicates,
      consList: [],           // consequence list
      story: [document.getElementById("story").value,"",""], // story, ending
      linkToggle: false,      // toggle depending on link state
      step: 0,                // hit step
      edit: true,             // are we editing a rule?
      stepBtn: true,
      nls: [],
      nlText:''
    }
  },

  removePredicate: function (i) {
    var predicates = this.state.predicates;
    predicates.splice(i, 1);
    var consequences = this.state.consList;
    consequences.splice(i,1);
    var nls = this.state.nls;
    nls.splice(i,1);
    this.setState({consList: consequences});
    this.setState({predicates: predicates});
    this.setState({nls: nls});
    this.updateNL();

  },

  updatePredicate: function(actions,ops,consequence,i) { // predicate is a tuple of array of variables and an implication jth action, ith consequence
    var predicates = this.state.predicates;
    var consequences = this.state.consList;
    predicates[i][0] = actions;
    predicates[i][1] = ops;
    predicates[i][2] = consequence;
    consequences[i] = consequence;
    this.setState({predicates: predicates});
    this.setState({consList: consequences});
    //globalState[this.props.index] = this.state.predicates;

    var nls = this.state.nls
    var nl = 'If '
      for(var i = 0; i < actions.length; i++) {
        nl+=actions[i]+" "
        if(actions[i+1] !== undefined){
          nl+=ops[i]+" "
        }
      }
      nl=nl.trim()
      nl+=", then "+consequence;
      nl = nl.replace('--', '').replace(/~/gi, '').trim()+" "
    nls.push(nl)
    this.setState({nls: nls});
    this.updateNL();

  },

  addPredicate: function() {
    var predicates = this.state.predicates;
    predicates.push([[""],[""],"",[[],[]]]);
    predicates[predicates.length-1][3][20] = [""];
    this.toggleEdit();
    this.setState({predicates: predicates});
  },


  addPremise: function(i) {
    var predicates = this.state.predicates;
    predicates[i][0].push("");
    predicates[i][1].push("");
    predicates[i][3].push([[]]);
    predicates[i][3][predicates[i][3].length-20] = [""]; // TODO: fix
    ReactDOM.render(<FooterInstructionComponent step={1} substep={1} r={1} />, document.getElementById('footer-instructions'));
    this.setState({predicates:predicates});
  },
  
  removePremise: function(i, j) { // ith rule, jth premise
    var predicates = this.state.predicates;

    if (predicates[i][0].length == 1) {
      alert('Rule requires at least one premise.');
      return(1);
    }
    predicates[i][0].splice(j, 1);
    predicates[i][1].splice(j, 1);
    predicates[i][3].splice(j, 1);
    predicates[i][3].splice(j, 1);
    
    this.setState({predicates:predicates});
  },

  addLink: function(i,j,k, grounding ,c) { // ground kth word of the jth action of the ith rule and color
    var predicates = this.state.predicates;
    predicates[i][3][j][k] = [grounding,c]; // error here
    var nls = this.state.nls;
    var nlText = this.state.nlText;
    
    for(var i = 0; i < predicates.length; i++) {
      var predicate = predicates[i];
      var str1 ="if ";

      for(var j = 0; j < predicate[0].length; j++) {
          var str2 = predicate[0][j].replace('--', '').replace(/~/gi, '').trim()+" ";
          if(j!=predicate[0].length-1){
            str2+=predicate[1][j]+" ";
          }
        str2=str2.split(" ");
        for (var p in predicate[3][j]){
          var index = predicate[3][j].indexOf(predicate[3][j][p]);
          str2[index]=predicate[3][j][p][0];
        }
        str2=str2.join(" ");
        str1+=str2;
       }
      str1=str1.substring(0,str1.lastIndexOf(" "))+", then ";
      var cons=predicate[2].replace('--', '').replace(/~/gi, '').split(" ");

      for(var c in predicate[3][20]){
        var index = predicate[3][20].indexOf(predicate[3][20][c]);

        if(typeof(predicate[3][20][c][0])!='undefined'){
          cons[index]=predicate[3][20][c][0].replace('--', '').replace(/~/gi, '').trim()+" ";
        } else {
          cons[index]=cons[index].replace('--', '').replace(/~/gi, '').trim()+" ";

        }
      }
      cons=cons.join(" ");

      str1+=cons;
      str1=str1.replace('--', '');
      str1=str1[0].toUpperCase() + str1.slice(1).trim()+".";
      nls[i]=str1
      nlText=str1
    }

    this.setState({predicates: predicates});
    this.setState({nls:nls});
    this.setState({nlText:nlText});

    ReactDOM.render(<ContextBoard predicates={predicates}></ContextBoard>, document.getElementById('grounding-container'));
    ReactDOM.render(<NL nls={nls}></NL>, document.getElementById('nl-container'));

  },

  updateNL: function(){
      var nlText = this.state.nlText;
      var nls = this.state.nls;
      //ReactDOM.render(<NL nls={nls}></NL>, document.getElementById('nl-container'));
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
    $('#submit-btn').prop('disabled', false);
    var s = this.state.step;
    if(s == 0) {
      if(this.state.story[1] == "") {
        alert('Please select an ending from the two provided.');
        return(1);
      }
      s = s+1;
    } else if (s == 1) {
      if(this.state.consList.length < 1) {
        alert('Please create one rule before continuing.');
        return(1);
      } else {
        if(this.state.edit == true) {
          alert('please finish editing all rules before continuing.');
          return(1);
        }
      }
      s = s+1;
      if(s > 1) {
        document.getElementById('context-title').style.display="inline-block";
        document.getElementById('grounding-container').style.display="inline-block";
        document.getElementById('nl-title').style.display="inline-block";
        document.getElementById('nl-container').style.display="inline-block";
        this.updateNL()
        var nls = this.state.nls;
        var predicates = this.state.predicates;
        ReactDOM.render(<ContextBoard predicates={predicates}></ContextBoard>, document.getElementById('grounding-container'));
        ReactDOM.render(<NL nls={nls}></NL>, document.getElementById('nl-container'));

      }
    }
    this.setState({step: s});

    ReactDOM.render(<FooterInstructionComponent step={s} substep={1} r={0} />, document.getElementById('footer-instructions'));
  },

  prevStep: function() {
    var s = this.state.step;
    if (s > 0) {
      s = s-1;
    }
    if (s < 2) {
      document.getElementById('context-title').style.display="none";
      document.getElementById('grounding-container').style.display="none";
      document.getElementById('nl-title').style.display="none";
      document.getElementById('nl-container').style.display="none";

      //this.setState({stepBtn:!this.state.stepBtn});
    }
    this.setState({step: s});
    ReactDOM.render(<FooterInstructionComponent step={s} substep={1} r={1} />, document.getElementById('footer-instructions'));
  },
  
  e1Click: function() { // user clicks ending 1
    this.refs.e1.disabled = true;
    this.refs.e2.disabled = false;
    var e = document.getElementById("story-ending").value;
    var s = this.state.story;
    s[1] = e;
    s[2] = "2";
    this.setState({story: s});
  },
  
  e2Click: function() { // clicks ending 2
    this.refs.e2.disabled = true;
    this.refs.e1.disabled = false;
    var e = document.getElementById("story-ending2").value;
    var s = this.state.story;
    s[1] = e;
    s[2] = "1";
    this.setState({story: s});
  },
  
  render: function() {
    var nextBtnStyle = { display: 'inline-block', marginRight: 10 };
    var prevBtnStyle = { display: 'inline-block', marginRight: 10 };
    var newRuleBtnStyle = {display: 'inline-block',marginLeft: 5, backgroundColor: '#4CAF50'};
    var nlBtnStyle = { display: 'inline-block', margin: 5, backgroundColor:'#5cb85c' };
    var contextStyle = {textAlign: 'center'};

    var predicateStyle = {};
    if(this.state.step==0) {
      ReactDOM.render(<FooterInstructionComponent step={0} substep={1} r={1} />, document.getElementById('footer-instructions'));
    }
    else if(this.state.step==1) {
      predicateStyle['display'] = 'inline-block';
      nextBtnStyle['display'] = 'inline-block';
      newRuleBtnStyle['display'] = 'inline-block';
    } else if(this.state.step==2) {
      if(this.state.linkToggle == true) {
        this.refs.prevStep['disabled'] = true;
      } else {
        this.refs.prevStep['disabled'] = false;
      }
      predicateStyle['display'] = 'inline-block';
      nextBtnStyle['display'] = 'none';
    }
    if(this.state.step != 1) {
      newRuleBtnStyle['display'] = 'none'
    }
    
    if(this.props.index == this.props.i_x) {
      if(this.state.step==0) {
        if(this.state.story[2] != "") {
          document.getElementById("ending1").style.display="block";
          document.getElementById("ending2").style.display="block";
        }
        return(
          <div className="predicates">
            <div className="row">
              <SubHeaderInstructionComponent step={this.state.step} />
            </div>
            <div className="row">
              <div className="col-md-4 col-md-offset-4 text-center">
                <button ref={'e1'} onClick={this.e1Click} style={nextBtnStyle} className='btn step-fwd-btn btn-primary'>Ending 1</button>
                <button ref={'e2'} onClick={this.e2Click} style={nextBtnStyle} className='btn step-fwd-btn btn-primary'>Ending 2</button>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4 col-md-offset-4 text-center">
                <button ref={'nextStep'} onClick={this.nextStep} style={nextBtnStyle} disabled={!this.state.stepBtn} className='btn step-fwd-btn btn-primary'>Next Step</button>
              </div>
            </div>
          </div>
        );
      } else {
        document.getElementById("ending1").style.display="none";
        document.getElementById("ending2").style.display="none";
        document.getElementById("story").value = this.state.story[0] + " " + this.state.story[1];
        return(
          <div className="predicates">
            <div className="row">
              <SubHeaderInstructionComponent step={this.state.step} />
            </div>
            <div className="row">
              <button ref='addBtn' onClick={this.addPredicate} className='btn btn-s add-predicate-btn' style={newRuleBtnStyle}>Add New Rule</button>
            </div>
            <div style={predicateStyle}>
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
                    removePremise={this.removePremise}
                    updateNL={this.updateNL}>
                  </RuleComponent>
                  );
              }, this)
            }
            </div>
            <div className="row">
              <div className='col-md-8 col-md-offset-2 text-center'>
                <b id='context-title' style={{display: "none"}}><h4>Story Grounding Rules</h4></b>
                <br></br>
                <div id='grounding-container'></div>
              </div>
              <div className='col-md-8 col-md-offset-2 text-center'>
                <b id='nl-title' style={{display: "none"}}><h4>Natural Language Output</h4></b>
                <br></br>
                <div id='nl-container'></div>
              </div>
              <hr></hr>
            </div>
            <div className="row">
              <div className="col-md-4 col-md-offset-4 text-center">
                <button ref={'prevStep'} onClick={this.prevStep} style={prevBtnStyle} disabled={!this.state.stepBtn} className='btn step-fwd-btn btn-primary'>Previous Step</button>
                <button ref={'nextStep'} onClick={this.nextStep} style={nextBtnStyle} disabled={!this.state.stepBtn} className='btn step-fwd-btn btn-primary'>Next Step</button>
              </div>
            </div>
          </div>
          );
        }
    } else {
      return(false);
    }
  }
});

/*
Displays the story logic-context link state
*/
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
                        <div style={colorStyle}>  {"In rule "+(i+1) + ", the consequence on the right-hand-side" + ", you mapped: word " + (k+1) +"("+predicate[2].split(" ")[k]+") -> "+mapping[0]} </div>
                        );
                    } else {
                      return(
                        <div style={colorStyle}>  {"In rule "+(i+1) + ", the premise " +(j+1) + " on the left-hand-side, you mapped: word: " + (k+1) +"("+predicate[0][j].split(" ")[k]+"): -> "+mapping[0]} </div>
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


var NL = React.createClass({
  render: function() {
    var contextStyle = {textAlign: 'center'};
    var nlsStyle = {textAlign: 'center', color: '#0099CC'};
    return(
      <div id='nls' style={contextStyle}>
      {
      this.props.nls.map(function(nl,i){ 
        var natlang = nl.replace(/--/gi, '').replace(/~/gi, '').replace(/subject/gi,'').trim()+" ";
        var n = natlang.replace('subject','');
        return(
          <div style={nlsStyle}>{n}</div>
        );
      }, this)
    }
    </div>
    );
  }
});


window.PredicateManager = PredicateManager;