const state = {
  getState: () => {},
  dispatch: {},
}

function connect(mapStateToProps: Function, mapDispatchToProps: Function) {
  return (Component: any) => {
    const stateProps = mapStateToProps(state.getState()) // 拿到状态
    const stateDispatch = mapDispatchToProps(state.dispatch) // 拿到当前的dispatch
    return <Component {...stateProps} {...stateDispatch} />
  }
}

export default connect

// const mapStateToProps = (state: any) => {
//   return {
//     list: state.hot.list || [],
//   };
// };

// const mapDispatchToProps = (dispatch: Function) => {
//   return {
//     getList: dispatch({ type: '', payload: {} }),
//   };
// };
