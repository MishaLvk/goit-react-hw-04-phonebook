import PropTypes from 'prop-types';

const Filter = ({ value, onChange }) => (
  <label className="Lable">
    filter
    <input type="text" value={value} onChange={onChange}></input>
  </label>
);

export default Filter;

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
