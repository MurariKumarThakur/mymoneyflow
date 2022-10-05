const getFormatedDate = (date) => {
    let time;
    time = new Date(date).toDateString();

    return time;
  };
  const getFullDate = (date) => {
    let _date = new Date(date);
    let _fullYear = _date.getFullYear();
    let _month = String(_date.getMonth() + 1).padStart(2, "0");
    let _day = String(_date.getDate()).padStart(2, "0");
    let _formatedDate = _day + "-" + _month + "-" + _fullYear;

    return _formatedDate;
  };

  export default{
    getFormatedDate:getFormatedDate ,
    getFullDate:getFullDate
  }