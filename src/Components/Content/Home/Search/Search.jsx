import { Dropdown, DropdownButton, Form, Button } from "react-bootstrap";
import SearchStyles from "./Search.module.css";
import { connect } from "react-redux";
import DatePicker from "react-datepicker";
import { handleSubmitQueryParametersThunk } from "../../../../Redux/actions";
const sortVariants = [
  {
    label: "A-Z",
    value: "a-z",
  },
  {
    label: "Z-A",
    value: "z-a",
  },
  {
    label: "Creation-Date-Oldest",
    value: "creation_date_oldest",
  },
  {
    label: "Creation-Date-Newest",
    value: "creation_date_newest",
  },
  {
    label: "Completion-Date-Oldest",
    value: "completion_date_oldest",
  },
  {
    label: "Completion-Date-Newest",
    value: "completion_date_newest",
  },
  {
    label: "Reset",
    value: "",
  },
];
const statusVariants = [
  {
    label: "Done",
    value: "done",
  },
  {
    label: "Active",
    value: "active",
  },
  {
    label: "Reset",
    value: "",
  },
];

const Search = (props) => {
  const {
    //state
    sort,
    status,
    search,
    create_lte,
    create_gte,
    complete_lte,
    complete_gte,
    //functions
    setDropDownForSearch,
    handleChange,
    setDate,
    submitQueryParameters,
    resetDate
  } = props;

  const handleSubmit = (e) => {
    let queryParameters = {
      sort,
      status,
      search,
      create_lte,
      create_gte,
      complete_lte,
      complete_gte,
    };
    e.preventDefault();
    submitQueryParameters(queryParameters);
  };

  const sortItems = sortVariants.map((variant, index) => {
    return (
      <Dropdown.Item
        onClick={() => setDropDownForSearch("sort", variant.value)}
        key={index}
      >
        {variant.label}
      </Dropdown.Item>
    );
  });

  const statusItems = statusVariants.map((variant, index) => {
    return (
      <Dropdown.Item
        onClick={() => setDropDownForSearch("status", variant.value)}
        key={index}
      >
        {variant.label}
      </Dropdown.Item>
    );
  });

  return (
    <>
      <div className={SearchStyles.dropbtnswrap}>
      <DropdownButton
        title={
          sort ? sortVariants.find((item) => item.value === sort).label : "Sort"
        }
        variant="secondary"
        style={{marginRight: "3px"}}
      >
        {sortItems}
      </DropdownButton>
      <DropdownButton
        title={
          status
            ? statusVariants.find((item) => item.value === status).label
            : "Status"
        }
        variant="secondary"
        style={{marginRight: "3px"}}
      >
        {statusItems}
      </DropdownButton>
      <DropdownButton
        title="Date"
        variant="secondary"
        style={{marginRight: "3px"}}
      >
        <div className={SearchStyles.datepickerWrapper}>
          <div className={SearchStyles.datepickerStyles}>Create-Lte</div>
          <DatePicker
            selected={create_lte}
            onChange={(date) => setDate("create_lte", date)}
          />
        </div>
        <div className={SearchStyles.datepickerWrapper}>
          <div className={SearchStyles.datepickerStyles}>Create-Gte</div>
          <DatePicker
            selected={create_gte}
            onChange={(date) => setDate("create_gte", date)}
          />
        </div>
        <div className={SearchStyles.datepickerWrapper}>
          <div className={SearchStyles.datepickerStyles}>
            Complete-Lte
          </div>
          <DatePicker
            selected={complete_lte}
            onChange={(date) => setDate("complete_lte", date)}
          />
        </div>
        <div className={SearchStyles.datepickerWrapper}>
          <div className={SearchStyles.datepickerStyles}>
            Complete-Gte
          </div>
          <DatePicker
            selected={complete_gte}
            onChange={(date) => setDate("complete_gte", date)}
          />
        </div>
        <div className={SearchStyles.datepickerWrapper}>
          <div className={SearchStyles.datepickerStyles}>
            <button className={SearchStyles.resetbtn} onClick={resetDate} >Reset</button>
          </div>
        </div>
      </DropdownButton>
      </div>
      <div  className={SearchStyles.searchwrap}>
        <input
          placeholder="Task Name"
          className={SearchStyles.inptwrap}
          name="search"
          value={search}
          onChange={(e) => handleChange(e.target)}
        />

      <button
        variant="primary"
        type="submit"
        className={SearchStyles.btnwrap}
        onClick={handleSubmit}
        disabled={(
            sort || 
            search || 
            status || 
            create_lte ||
            create_gte ||
            complete_lte ||
            complete_gte) ? false : true}
      >
        Submit
      </button>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  const {
    sort,
    status,
    search,
    create_lte,
    create_gte,
    complete_lte,
    complete_gte,
  } = state.searchState;
  return {
    sort,
    status,
    search,
    create_lte,
    create_gte,
    complete_lte,
    complete_gte,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    //SYNC
    setDropDownForSearch: (dropDown, value) => {
      dispatch({ type: "SET_DROPDOWN_VARIANT", dropDown, value });
    },
    handleChange: (target) => {
      dispatch({ type: "CHANGE_SEARCH_VALUE", target });
    },
    setDate: (name, value) => {
      dispatch({ type: "SET_DATE", name, value });
    },
    resetDate: () => {
        dispatch({ type: "RESET_DATE"});
    },
    //ASYNC
    submitQueryParameters: (queryParameters) => {
      dispatch((dispatch) =>
        handleSubmitQueryParametersThunk(dispatch, queryParameters)
      );
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
