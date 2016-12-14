import React, {PropTypes} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight
} from 'react-native';
import {bindActionCreators} from 'redux';
import * as courseAction from './actions/actions';
import { connect } from 'react-redux';

class AppComponent extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      course: {title: ""}
    };

    // THIS THE RECOMMENDED WAY TO BIND AN ACTION TO AVOID PERFORMANCE ISSUE
    this.onClickSave = this.onClickSave.bind(this);
  }

  onClickSave() {
    const course = this.state.course;
    course.title = this.state.courseName;
    this.setState({course: course});
    this.props.actions.createCourse(this.state.course);
  }

  courseList(course, index) {
    return <Text key={index}>{course.title}</Text>;
  }

  render() {
    console.log(this.props.courses ? this.props.courses.map(this.courseList) : null);
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          MAIN PAGE
        </Text>
        <TextInput
          onChangeText={(courseName) => { this.setState({courseName}) }}
          style={styles.loginTextBox}
          placeholder='Enter Something'
        />
        {this.props.courses ? this.props.courses.map(this.courseList) : null}
        <TouchableHighlight style={styles.loginButton} onPress={this.onClickSave}>
          <Text style={styles.appTitle}>
            SAVE
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  appTitle: {
    fontSize: 26,
    fontWeight: 'bold',
  },
  loginButton: {
    backgroundColor: '#00bfff',
    width: 250,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  loginTextBox: {
    width: 250,
  },
});

AppComponent.propTypes = {
  // 2. VALIDATE THE ACTION
  actions: PropTypes.object.isRequired,
  courses: PropTypes.array.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    courses: state.reducer
  };
}

// 1. BIND THE ACTION FIRST
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(courseAction, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AppComponent);
