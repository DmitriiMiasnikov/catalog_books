import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { FiltersDom } from './FiltersDom';

const Filters = ({ filtersAll, dropdownsAll, isMobile }) => {
  const [buttonsFilter, setButtonsFilter] = useState({});
  const [dropdowns, setDropdowns] = useState(dropdownsAll);
  useEffect(() => {
    if (filtersAll) {
      const dropdownsUpdate = [];
      dropdownsAll.forEach(el => {
        if (Object.keys(filtersAll).includes(el.type)) dropdownsUpdate.push(el);
      })
      dropdownsUpdate.filter(el => el).map((el, i) => {
        el.id = i
        el.closed = true;
        return el
      })
      setDropdowns(dropdownsUpdate)
    }
  }, [filtersAll, dropdownsAll])
  useEffect(() => {
    if (filtersAll) {
      const filtersCopy = {};
      dropdowns.forEach((el, i) => {
        if (filtersAll[el.type]) {
          filtersCopy[el.type] = filtersAll[el.type].map((item, j) => {
            return {
              active: !j,
              [el.type]: item
            }
          })
        }
      })
      setButtonsFilter(filtersCopy);
    }
  }, [filtersAll, dropdowns]);

  return (
    <FiltersDom {...{ buttonsFilter, dropdowns, isMobile }} />
  )
}

const mapStatesToProps = (state) => {
  return {
    filtersAll: state.filter.filtersAll,
    dropdownsAll: state.filter.dropdownsAll,
    isMobile: state.main.isMobile
  }
}

export default compose(
  connect(mapStatesToProps, {}),
  withRouter
)(Filters);