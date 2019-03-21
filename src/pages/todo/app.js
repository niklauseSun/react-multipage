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
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import {
	filtAction,
	filterTodo
} from 'store/action/filtAction'

import LineInput from "component/LineInput"
import SelectButton from "component/SelectButton"
import ExpandView from "component/ExpandView"
import SelectStickButton from "component/SelectStickButton"

const serum = ['μmoI/L', 'mg/dL']
const targetRange = ["10-15 mg/L", "15-20 mg/L", "自定义"];
const targetRangeSelect = [[10, 15], [15, 20]]
const mic = ["1 mg/L", "0.5 mg/L", "2 mg/L", "自定义"];
const micSelect = [1, 0.5, 2]
const rate = ["500 mg/h", "750 mg/h", "1000 mg/h", '自定义'];
const rateSelect = [500, 750, 1000]

class App extends React.Component {
	constructor(props){
		super(props);
		this.state={
			initIndex: 1,
			value: 0,
			serumIndex: 0,
			targetRangeIndex: 0,
			micIndex: 0,
			rateIndex: 0,

			age: "", // 年龄
			gender: 0,
			height: "", // 身高
			weight: "", // 体重
			serumNum: "", // 血肌酐
			targetNum: "", // 目标浓度范围
			micNum: "", // mic
			rateNum: "", // 输出速率

			dose: "", // 剂量
			dosingInterval: "", // 给药间隔
			// Infusion time
			infusionTime: "", // 输注时间
			valley: "", // 测定谷浓度
			targetFirst: "",
			targetSecond: "",
			micOpen: false,
			targetOpen: false,
			rateOpen: false
		}
	}

	handleChange = (event, value) => {
		this.setState({ value });
	};

	handleMicOpen = () => {
		this.setState({
			micOpen: true
		})
	}

	handleMicClose = () => {
		this.setState({
			micOpen: false,
			micNum: ""
		})
	}

	handleMicSure = () => {
		this.setState({
			micOpen: false,
			micIndex: 3
		})
	}

	handleTargetOpen = () => {
		this.setState({
			targetOpen: true
		})
	}

	handleTargetClose = () => {
		this.setState({
			targetOpen: false,
			targetFirst: "",
			targetSecond: ""
		})
	}

	handleTargetSure = () => {
		this.setState({
			targetRangeIndex: 2,
			targetOpen: false,
		})
	}

	handleRateOpen = () => {
		this.setState({
			rateOpen: true
		})
	}

	handleRateClose = () => {
		this.setState({
			rateOpen: false
		})
	}

	handleRateSure = () => {
		this.setState({
			rateIndex: 3,
			rateOpen: false
		})
	}

	componentDidMount() {
		window.document.addEventListener("message", (event) => {
			let message = event.data;
			let messages = message.split(";")
			this.setState({
				baseUrl: messages[2],
				sessionId: messages[1],
				calculateType: messages[0]
			})
		});
	}

	render() {
		const { value, initIndex, calculateType = 0 } = this.state;

		const tabTitleOne = parseInt(calculateType) === 0 ? '初始记录' : '初始浓度记录'
		const tabTitleTwo = parseInt(calculateType) === 0 ? '调整记录' : '调整浓度记录'

		if (initIndex === 0) {
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
					{this.renderTargetDialog()}
					{this.renderMicDialog()}
					{this.renderRateDialog()}
				</div>
			);
		}

		return (
			<div className="App">
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
				{this.renderMicDialog()}
			</div>
		)
		
	}

	renderBegin() {
		return (
			<div className="begin-content">
				<div className="base-title-content">
					<span className="base-title">基础参数</span>
				</div>
				<div className="base-view">
					<LineInput title="年龄" subTitle="岁" textValue={this.state.age} onChangeText={this.changeAge.bind(this)} />
					<div className="base-view-input-item">
						<span className="sex-title">性别</span>
						<div className="fill-view"></div>
						<SelectButton gender={this.state.gender} changeGender={this.changeGender.bind(this)} />
					</div>
					<LineInput title="身高" subTitle="cm" textValue={this.state.height} onChangeText={this.changeHeight.bind(this)} />
					<LineInput title="体重" subTitle="kg" textValue={this.state.weight} onChangeText={this.changeWeight.bind(this)} />
					{/* <LineInput title="血肌酐" subTitle="μmoI/L" />
					 */}
					<ExpandView
						title="血肌酐"
						subTitle={serum[this.state.serumIndex]}
						textValue={this.state.serumNum}
						onChangeText={this.changeSerumNum.bind(this)}
						subView={
							<div style={{ display: 'flex', height: 56, flexDirection: 'row', alignItems: 'center', paddingLeft: 16, paddingRight: 16 }}>
								<SelectStickButton activeIndex={0} active={this.state.serumIndex === 0} title={serum[0]} changeIndex={this.changeSerumIndex.bind(this)} style={{marginRight: 16}} />
								<SelectStickButton activeIndex={1} active={this.state.serumIndex === 1} title={serum[1]} changeIndex={this.changeSerumIndex.bind(this)} />
							</div>}
					/>
				</div>
				<div className="pre-title-content">
					<span className="pre-title">期望方案设置</span>
				</div>
				{/* <div className="base-view pre-set">
					<LineInput title="MIC" subTitle="mg/L" />
					<LineInput title="剂量" subTitle="mg" />
					<LineInput title="给药间隔" subTitle="hrs" />
					<LineInput title="输注时间" subTitle="hrs" />
				</div> */}
				{this.renderPresetView()}
			</div>
		)
	}

	renderAdjust() {
		return (
			<div className="begin-content">
				<div className="base-title-content">
					<span className="base-title">当前用药及TDM情况</span>
				</div>
				<div className="base-view">
					<LineInput title="剂量" subTitle="mg" textValue={this.state.dose} onChangeText={this.changeDose.bind(this)}/>
					<LineInput title="给药间隔" subTitle="hrs" textValue={this.state.dosingInterval} onChangeText={this.changeDosingInterval.bind(this)} />
					<LineInput title="输注时间" subTitle="hrs" textValue={this.state.infusionTime} onChangeText={this.changeInfusionTime.bind(this)} />
					<LineInput title="测定谷浓度" subTitle="mg/L" textValue={this.state.valley} onChangeText={this.changeValley.bind(this)} />
				</div>
				<div className="pre-title-content">
					<span className="pre-title">期望方案设置</span>
				</div>
				{this.renderPresetView()}
			</div>
		)
	}

	renderPresetView() {
		const { initIndex } = this.state;

		if (initIndex === 0) {
			return (
				<div className="base-view pre-set">
					<ExpandView
						title="目标浓度范围"
						subTitle={this.state.targetRangeIndex === 2 ? `${this.state.targetFirst}-${this.state.targetSecond} mg/L` :targetRange[this.state.targetRangeIndex]}
						showTextInput={false}
						subView={
							<div style={{ display: 'flex', height: 56, flexDirection: 'row', alignItems: 'center', paddingLeft: 16, paddingRight: 16, justifyContent: 'space-between' }}>
								<SelectStickButton activeIndex={0} active={this.state.targetRangeIndex === 0} title={targetRange[0]} changeIndex={this.changeTargetIndex.bind(this)} />
								<SelectStickButton activeIndex={1} active={this.state.targetRangeIndex === 1} title={targetRange[1]} changeIndex={this.changeTargetIndex.bind(this)} />
								<SelectStickButton activeIndex={2} active={this.state.targetRangeIndex === 2} title={targetRange[2]} changeIndex={this.changeTargetIndex.bind(this)} />
							</div>}
					/>
					<ExpandView
						title="MIC"
						subTitle={this.state.micIndex === 3 ? `${this.state.micNum} mg/L`: mic[this.state.micIndex]}
						showTextInput={false}
						subView={
							<div style={{ height: 112 }}>
								<div style={{ display: 'flex', height: 56, flexDirection: 'row', alignItems: 'center', paddingLeft: 16, paddingRight: 16 }}>
									<SelectStickButton activeIndex={0} active={this.state.micIndex === 0} title={mic[0]} changeIndex={this.changeMicIndex.bind(this)} style={{ marginRight: 16 }} />
									<SelectStickButton activeIndex={1} active={this.state.micIndex === 1} title={mic[1]} changeIndex={this.changeMicIndex.bind(this)} style={{ marginRight: 16 }} />
									<SelectStickButton activeIndex={2} active={this.state.micIndex === 2} title={mic[2]} changeIndex={this.changeMicIndex.bind(this)} style={{ marginRight: 16 }} />
								</div>
								<div style={{ display: 'flex', height: 56, flexDirection: 'row', alignItems: 'center', paddingLeft: 16, paddingRight: 16 }}>
									<SelectStickButton activeIndex={3} active={this.state.micIndex === 3} title={mic[3]} changeIndex={this.changeMicIndex.bind(this)} style={{ marginRight: 16 }} />
								</div>
							</div>
						}
					/>
					<ExpandView
						title="输出速率"
						subTitle={this.state.rateIndex === 3 ? `${this.state.rateNum} mg/h`: rate[this.state.rateIndex]}
						showTextInput={false}
						subView={
							<div style={{ height: 112 }}>
								<div style={{ display: 'flex', height: 56, flexDirection: 'row', alignItems: 'center', paddingLeft: 16, paddingRight: 16 }}>
									<SelectStickButton activeIndex={0} active={this.state.rateIndex === 0} title={rate[0]} changeIndex={this.changeRateIndex.bind(this)} style={{ marginRight: 10 }} />
									<SelectStickButton activeIndex={1} active={this.state.rateIndex === 1} title={rate[1]} changeIndex={this.changeRateIndex.bind(this)} style={{ marginRight: 10 }} />
									<SelectStickButton activeIndex={2} active={this.state.rateIndex === 2} title={rate[2]} changeIndex={this.changeRateIndex.bind(this)} />
								</div>
								<div style={{ display: 'flex', height: 56, flexDirection: 'row', alignItems: 'center', paddingLeft: 16, paddingRight: 16 }}>
									<SelectStickButton activeIndex={3} active={this.state.rateIndex === 3} title={rate[3]} changeIndex={this.changeRateIndex.bind(this)} style={{ marginRight: 16 }} />
								</div>
							</div>
						}
					/>
				</div>
			)
		}
		return (
			<div className="base-view pre-set">
				<ExpandView
					title="MIC"
					subTitle={this.state.micIndex === 3 ? `${this.state.micNum} mg/L` : mic[this.state.micIndex]}
					showTextInput={false}
					subView={
						<div style={{ height: 112 }}>
							<div style={{ display: 'flex', height: 56, flexDirection: 'row', alignItems: 'center', paddingLeft: 16, paddingRight: 16 }}>
								<SelectStickButton activeIndex={0} active={this.state.micIndex === 0} title={mic[0]} changeIndex={this.changeMicIndex.bind(this)} style={{ marginRight: 16 }} />
								<SelectStickButton activeIndex={1} active={this.state.micIndex === 1} title={mic[1]} changeIndex={this.changeMicIndex.bind(this)} style={{ marginRight: 16 }} />
								<SelectStickButton activeIndex={2} active={this.state.micIndex === 2} title={mic[2]} changeIndex={this.changeMicIndex.bind(this)} style={{ marginRight: 16 }} />
							</div>
							<div style={{ display: 'flex', height: 56, flexDirection: 'row', alignItems: 'center', paddingLeft: 16, paddingRight: 16 }}>
								<SelectStickButton activeIndex={3} active={this.state.micIndex === 3} title={mic[3]} changeIndex={this.changeMicIndex.bind(this)} style={{ marginRight: 16 }} />
							</div>
						</div>
					}
				/>
				<LineInput title="剂量" subTitle="mg" textValue={this.state.dose} onChangeText={this.changeDose.bind(this)}/>
				<LineInput title="给药间隔" subTitle="hrs" textValue={this.state.dosingInterval} onChangeText={this.changeDosingInterval.bind(this)} />
				<LineInput title="输注时间" subTitle="hrs" textValue={this.state.infusionTime} onChangeText={this.changeInfusionTime.bind(this)} />
			</div>
		)
	}

	renderTargetDialog() {
		return (
			<Dialog
				open={this.state.targetOpen}
				onClose={this.handleTargetClose}
				// aria-labelledby="form-dialog-title"
			>
				<DialogTitle id="form-dialog-title">自定义</DialogTitle>
				<DialogContent style={{ display: 'flex'}}>
					<TextField
						autoFocus
						id="name"
						type="email"
						value={this.state.targetFirst}
						onChange={this.changeTargetFirst.bind(this)}
					/>
					<span style={{ marginLeft: 8, marginRight: 8}}>-</span>
					<TextField
						id="name"
						type="email"
						value={this.state.targetSecond}
						onChange={this.changeTargetSecond.bind(this)}
					/>
					<span style={{ marginLeft: 8 }}>mg/L</span>
				</DialogContent>
				<DialogActions>
					<Button onClick={this.handleTargetSure} color="primary">
						确定
            		</Button>
				</DialogActions>
			</Dialog>
		)

	}

	renderMicDialog() {
		return (
			<Dialog
				open={this.state.micOpen}
				onClose={this.handleMicClose}
			// aria-labelledby="form-dialog-title"
			>
				<DialogTitle id="form-dialog-title">自定义</DialogTitle>
				<DialogContent style={{ display: 'flex' }}>
					<TextField
						autoFocus
						id="name"
						type="email"
						value={this.state.micNum}
						onChange={this.changeMicNum.bind(this)}
					/>
					<span style={{ marginLeft: 8 }}>mg/L</span>
				</DialogContent>
				<DialogActions>
					<Button onClick={this.handleMicSure} color="primary">
						确定
            		</Button>
				</DialogActions>
			</Dialog>
		)
	}

	renderRateDialog() {
		return (
			<Dialog
				open={this.state.rateOpen}
				onClose={this.handleRateClose}
			// aria-labelledby="form-dialog-title"
			>
				<DialogTitle id="form-dialog-title">自定义</DialogTitle>
				<DialogContent style={{ display: 'flex' }}>
					<TextField
						autoFocus
						id="name"
						type="email"
						value={this.state.rateNum}
						onChange={this.changeRateNum.bind(this)}
					/>
					<span style={{ marginLeft: 8 }}>mg/h</span>
				</DialogContent>
				<DialogActions>
					<Button onClick={this.handleRateSure} color="primary">
						确定
            		</Button>
				</DialogActions>
			</Dialog>
		)
	}

	changeSerumIndex(val) {
		this.setState({
			serumIndex: val
		})
	}

	changeTargetIndex(val) {
		if (val === 2) {
			this.handleTargetOpen()
			return;
		}

		this.setState({
			targetRangeIndex: val
		})
	}

	changeMicIndex(val) {
		if (val === 3) {
			this.handleMicOpen()
			return;
		}
		this.setState({
			micIndex: val
		})
	}

	changeRateIndex(val) {
		if (val === 3) {
			this.handleRateOpen()
			return;
		}
		this.setState({
			rateIndex: val
		})
	}

	changeAge(val) {
		this.setState({
			age: val
		})
	}

	changeGender(val) {
		this.setState({
			gender: val
		})
	}

	changeHeight(val) {
		this.setState({
			height: val
		})
	}

	changeWeight(val) {
		this.setState({
			weight: val
		})
	}

	changeSerumNum(val) {
		this.setState({
			serumNum: val
		})
	}

	changeDose(val) {
		this.setState({
			dose: val
		})
	}

	changeDosingInterval(val) {
		this.setState({
			dosingInterval: val
		})
	}

	changeInfusionTime(val) {
		this.setState({
			infusionTime: val
		})
	}

	changeValley(val) {
		this.setState({
			valley: val
		})
	}

	changeMicNum(event) {
		this.setState({
			micNum: event.target.value
		})
	}

	changeTargetFirst(event) {
		this.setState({
			targetFirst: event.target.value
		})
	}

	changeTargetSecond(event) {
		this.setState({
			targetSecond: event.target.value
		})
	}

	changeRateNum(event) {
		this.setState({
			rateNum: event.target.value
		})
	}


	saveData() {
		const { calculateType, value } = this.state;
		if (parseInt(calculateType) === 0 && value === 0) {
			// 初始记录
		} else if (parseInt(calculateType) === 0 && value === 1 ) {
			// 调整记录
		} else if (parseInt(calculateType) === 1 && value === 0) {
			// 初始浓度
		} else if (parseInt(calculateType) === 1 && value === 1) {
			// 调整浓度
		}
	}
}

const mapStatesToProps = (state) => ({
	fiterState: state.fiterState,
	todoCopy:state.todoList
});
 
export default connect(
	mapStatesToProps
)(App);

