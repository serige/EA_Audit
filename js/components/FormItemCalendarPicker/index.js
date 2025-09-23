// @flow

import React, { Component } from 'react';
import {
  Text,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
import Styles from './Styles';

class DateInput extends Component {
  static propTypes = {
    title: PropTypes.string,
    value: PropTypes.string,
    mode: PropTypes.string,
    format: PropTypes.string,
    onValueChange: PropTypes.func,
    placeholder: PropTypes.string,
  }

  _onItemPress = () => {
    this.ref && this.ref.onPressDate();
  }

  render() {
    const {
      title,
      value,
      mode,
      format,
      onValueChange,
      placeholder,
    } = this.props;
    const minDate = moment("01/01/01", "DD/MM/YY").format(format);
    const maxDate = moment("01/01/30", "DD/MM/YY").format(format);
    return (
      <TouchableOpacity
        onPress={this._onItemPress}
        style={[Styles.container]}
      >
        {title !== '' &&
          <Text style={[Styles.title]}>
            {title}
          </Text>
        }
        <DatePicker
          date={value}
          mode={mode}
          androidMode="spinner"
          ref={(ref: Object) => this.ref = ref}
          placeholder={placeholder || "select date"}
          format={format}
          minDate={minDate}
          maxDate={maxDate}
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          iconSource={null}
          onDateChange={onValueChange}
          customStyles={{
            dateInput: Styles.pickerBody,
            placeholderText: Styles.placeholder,
            dateText: Styles.placeholder,
          }}
        />
      </TouchableOpacity>
    );
  }
}


DateInput.defaultProps = {
  title: '',
  value: '',
  mode: 'date',
  format: 'DD/MM/YY',
  onValueChange: () => {},
  placeholder: "",
};

export default DateInput;
