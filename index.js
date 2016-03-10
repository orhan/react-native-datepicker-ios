
'use strict';

var React = require('react-native');
var {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Modal,
    DatePickerIOS,
    Dimensions
} = React;

var SCREEN_WIDTH = Dimensions.get('window').width;

var Component = React.createClass({
    show: function(){
      this.setState({modalVisible: true});
    },

    getInitialState: function(){
      return {
        color: this.props.color || '#007AFF',
        pickerBackgroundColor: this.props.pickerBackgroundColor || '#F5FCFF',
        modalVisible: false,
        selectedDate: this.state.selectedDate || this.props.date,
        pickerHeight: 0,
        buttonColor: this.props.buttonColor || '#007AFF',
      };
    },

    componentDidUpdate() {
      this.measurePickerHeight();
    },

    measurePickerHeight() {
      if (this.refs && this.refs.pickerView && this.state.pickerHeight == 0) {
        this.refs.pickerView.measure((a, b, width, height, px,py ) => {
          this.setState({
            pickerHeight: height,
          });
        });
      }
    },

    renderBackground() {
      if (this.props.renderBackground) {
        return (
          <View style={[styles.modalBackground, {height: this.state.pickerHeight}]}>
            {React.cloneElement(this.props.renderBackground(), {})}
          </View>
        )
      } else {
        return null;
      }
    },

    render: function() {
      return (
        <Modal
          animated={true}
          transparent={true}
          visible={this.state.modalVisible}>

          <View style={styles.basicContainer}>

            <View ref="pickerView" style={[styles.modalContainer, {backgroundColor: this.state.pickerBackgroundColor}]}>

              {this.renderBackground()}

              <View style={styles.buttonView}>
                <TouchableOpacity onPress={() => {
                    if(this.props.onCancel) this.props.onCancel();
                    this.setState({modalVisible: false});
                }}>
                  <Text style={{color:this.state.buttonColor}}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    if(this.props.onSubmit) this.props.onSubmit(this.state.selectedDate);
                    this.setState({modalVisible: false});
                }}>
                  <Text style={{color:this.state.buttonColor}}>Confirm</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.mainBox}>
                {/*Model body*/}
                <DatePickerIOS
                  ref={'picker'}
                  date={this.state.date}
                  mode={this.props.mode}
                  minuteInterval={this.props.minuteInterval}
                  maximumDate={this.props.maximumDate}
                  minimumDate={this.props.minimumDate}
                  timeZoneOffsetInMinutes={this.props.timeZoneOffset}
                  onDateChange={(date) => this.setState({selectedDate: date})}
                  />
              </View>

            </View>
          </View>
        </Modal>
      );
    }
});

var styles = StyleSheet.create({
  basicContainer:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBackground:{
    position: 'absolute',
    left: 0,
    top: 0,
    width: SCREEN_WIDTH,
  },
  modalContainer:{
    position:'absolute',
    bottom:0,
    right:0,
    left:0,
    width:SCREEN_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
    padding:0,
  },
  buttonView:{
    width:SCREEN_WIDTH,
    padding: 8,
    borderTopWidth:0.5,
    borderTopColor:'#CCCCCC',
    justifyContent: 'space-between',
    flexDirection:'row',
  },
  bottomPicker : {
    width:SCREEN_WIDTH,
  },
  mainBox: {
  }
});

module.exports = Component;
