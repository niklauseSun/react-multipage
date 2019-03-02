/********************************
 * @file: todolist page
 * @desc: react-redux todo list
 * @author: leinov
 * @date:2018-12-06
 *******************************/

import React from "react";
import {connect} from "react-redux";
import utils from 'src/utils'
import Button from '@material-ui/core/Button';
import './App.scss'

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';


import {
	addTodo, 
	toggleTodo,
	deleteTodo
	} from "store/action/todoAction";
import {
	filtAction,
	filterTodo
} from 'store/action/filtAction'
import Nav from "component/nav";
import LineInput from "component/LineInput"
import SelectButton from "component/SelectButton"

class App extends React.Component {
	constructor(props){
		super(props);
		this.state={
			initIndex: 0,
			value: 0
		}
	}

	handleChange = (event, value) => {
		this.setState({ value });
	};
	// addTod input onChange
	onChange=(e)=>{
		this.setState({value:e.currentTarget.value});
	}
	// press keyboard
	onKeyDown=(e)=>{
		if(e.keyCode!==13){
			return;
		}
		const value = this.state.value;
		this.props.dispatch(addTodo(value));
	}

	// toggle todo
	onToggleClick=(id)=>{
		this.props.dispatch(toggleTodo(id));
	}

	// delete todo
	deleteTodo=(id)=>{
		const that = this;
		let  deleteIndex ;
		const arr = utils.deepCopy(that.props.todoCopy);
		arr.map((item,index)=>{
			if(item.id === id){
				deleteIndex=index;
			}
		})
		arr.splice(deleteIndex,1);
		this.props.dispatch(deleteTodo(arr));
	}

	// filter
	onFilterChange=(filter)=>{
		this.props.dispatch(filtAction(filter));
	}

	render() {
		const { value, initIndex } = this.state;

		const tabTitleOne = initIndex === 0 ? '初始记录' : '初始浓度记录'
		const tabTitleTwo = initIndex === 0 ? '调整记录' : '调整浓度记录'
		return (
			<div className="App">
				{/* <Button>default</Button>
				 */}
				<Tabs value={value} variant="fullWidth" onChange={this.handleChange}>
					<Tab label={tabTitleOne} />
					<Tab label={tabTitleTwo} />
				</Tabs>
				{value === 0 && this.renderBegin()}
				{value === 1 && this.renderAdjust()}
				<div className="foot-button">
					<div onClick={this.resetAction} className="reset-button"><span>重置</span></div>
					<div onClick={this.recordAction} className="record-button"><span>记录</span></div>
				</div>
			</div>
		);
	}

	renderBegin() {
		return (
			<div className="begin-content">
				<div className="base-title-content">
					<span className="base-title">基础参数</span>
				</div>
				<div className="base-view">
					<LineInput title="年龄" subTitle="岁" />
					<div className="base-view-input-item">
						<span className="title">性别</span>
						<div className="fill-view"></div>
						<SelectButton />
					</div>
					<LineInput title="身高" subTitle="cm" />
					<LineInput title="体重" subTitle="kg" />
					<LineInput title="血肌酐" subTitle="μmoI/L" />
				</div>
				<div className="pre-title-content">
					<span className="pre-title">期望方案设置</span>
				</div>
				<div className="base-view pre-set">
					<LineInput title="MIC" subTitle="mg/L" />
					<LineInput title="剂量" subTitle="mg" />
					<LineInput title="给药间隔" subTitle="hrs" />
					<LineInput title="输注时间" subTitle="hrs" />
				</div>
			</div>
		)
	}

	renderAdjust() {
		return null;
	}
}

const mapStatesToProps = (state) => ({
	todoList: filterTodo(state.todoList,state.fiterState),
	fiterState: state.fiterState,
	todoCopy:state.todoList
});
 
export default connect(
	mapStatesToProps
)(App);

