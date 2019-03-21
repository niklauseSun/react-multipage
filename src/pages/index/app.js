/********************************
 * @file: home page
 * @desc: overview react multi page app
 * @author: leinov
 * @date:2018-12-06
 *******************************/

import React, { Component } from "react";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import "./app.scss"
import { List } from 'antd';
import AxiosUtil from '../../AxiosUtil'

const data = [
	'Racing car sprays burning fuel into crowd.',
	'Japanese princess to wed commoner.',
	'Australian walks 100km after outback crash.',
	'Man charged over missing wedding girl.',
	'Los Angeles battles huge wildfires.',
];

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: 0,
			baseUrl: "",
			sessionId: "",
			dataIndex: ""
		}
	}

	handleChange = (event, value) => {
		this.setState({ value });
	};

	componentDidMount() {
		window.document.addEventListener("message", (event) => {
			let message = event.data;
			let messages = message.split(";")
			console.log('message', message, messages)
			this.setState({
				baseUrl: messages[2],
				sessionId: messages[1],
				dataIndex: messages[0]
			})
		});
	}

	render() {
		const { value } = this.state;
		return (
			<div className="App">
				{/* <Tabs value={value} variant="fullWidth" onChange={this.handleChange}>
					<Tab label="初始记录" />
					<Tab label="调整记录" />
					<Tab label="初始浓度" />
					<Tab label="调整浓度" />
				</Tabs> */}
				{this.renderContent()}
			</div>
			
		);
	}

	renderContent() {
		const { value, dataIndex = 0 } = this.state;
		console.log('renderContent',dataIndex)
		switch (parseInt(dataIndex)) {
			case 0:
				return (
					<div className="index-content">
						{this.renderAdjustConcentration()}
					</div>
				)
			case 1:
				return (
					<div className="index-content">
						{this.renderBeginConcentration()}
					</div>
				)
			case 2:
				return (
					<div className="index-content">
						{this.renderAdjustDose()}
					</div>
				)
			case 3:
				return (
					<div className="index-content">
						{this.renderAdjustDose()}
					</div>
				)
			default:
				return (
					<div className="index-content">
						{this.renderAdjustConcentration()}
					</div>
				)
		}
	}

	renderBeginDose() {
		return (
			<List
				className="list-content"
				header={<div>Header</div>}
				footer={<div>Footer</div>}
				bordered
				dataSource={data}
				renderItem={item => {
					return (
						<div style={{ marginLeft: 16, marginRight: 16, height: 198, background: 'white', marginBottom: 16, widht: '100%', borderRadius: 4 }}>
							<div style={{ height: 68, display: 'flex', alignItems: 'center', paddingLeft: 16, paddingRight: 16 }}>
								<span>2018.12.23 23:55</span>
							</div>
							<div style={{ height: 26, display: 'flex', alignItems: 'center' }}>
								<span style={{ width: 28, marginLeft: 16, fontSize: 14 }}>年龄</span>
								<span style={{ width: 31, marginLeft: 16, fontSize: 14 }}>48</span>
								<span style={{ width: 98, marginLeft: 16, fontSize: 14 }}>血肌酐</span>
								<span style={{ marginLeft: 16, fontSize: 14 }}>20μmoI/L</span>
							</div>
							<div style={{ height: 26, display: 'flex', alignItems: 'center' }}>
								<span style={{ width: 28, marginLeft: 16, fontSize: 14 }}>性别</span>
								<span style={{ width: 31, marginLeft: 16, fontSize: 14 }}>男</span>
								<span style={{ width: 98, marginLeft: 16, fontSize: 14 }}>目标谷浓度范围</span>
								<span style={{ marginLeft: 16, fontSize: 14 }}>10-15mg/L</span>
							</div>
							<div style={{ height: 26, display: 'flex', alignItems: 'center' }}>
								<span style={{ width: 28, marginLeft: 16, fontSize: 14 }}>身高</span>
								<span style={{ width: 31, marginLeft: 16, fontSize: 14 }}>1.7m</span>
								<span style={{ width: 98, marginLeft: 16, fontSize: 14 }}>MIC</span>
								<span style={{ marginLeft: 16, fontSize: 14 }}>0.5mg/L</span>
							</div>
							<div style={{ height: 26, display: 'flex', alignItems: 'center' }}>
								<span style={{ width: 28, marginLeft: 16, fontSize: 14 }}>体重</span>
								<span style={{ width: 31, marginLeft: 16, fontSize: 14 }}>72kg</span>
								<span style={{ width: 98, marginLeft: 16, fontSize: 14 }}>输注速率</span>
								<span style={{ marginLeft: 16, fontSize: 14 }}>32mg/h</span>
							</div>
						</div>
					)
				}}
			/>
		)
	}

	renderAdjustDose() {
		return (
			<List
				className="list-content"
				header={<div>Header</div>}
				footer={<div>Footer</div>}
				bordered
				dataSource={data}
				renderItem={item => {
					return (
						<div style={{ marginLeft: 16, marginRight: 16, height: 270, background: 'white', marginBottom: 16, widht: '100%', borderRadius: 4 }}>
							<div style={{ height: 68, display: 'flex', alignItems: 'center', paddingLeft: 16, paddingRight: 16 }}>
								<span>2018.12.23 23:55</span>
							</div>
							<div style={{ height: 26, display: 'flex', alignItems: 'center' }}>
								<span style={{ width: 120, marginLeft: 16, fontSize: 14, color: '#999', lineHeight: 14 }}>剂量</span>
								<span style={{ width: 180, marginLeft: 16, fontSize: 14, color: '#999', lineHeight: 14 }}>50mg</span>
							</div>
							<div style={{ height: 26, display: 'flex', alignItems: 'center' }}>
								<span style={{ width: 120, marginLeft: 16, fontSize: 14, color: '#999', lineHeight: 14 }}>给药间隔</span>
								<span style={{ width: 180, marginLeft: 16, fontSize: 14, color: '#999', lineHeight: 14 }}>4hrs</span>
							</div>
							<div style={{ height: 26, display: 'flex', alignItems: 'center' }}>
								<span style={{ width: 120, marginLeft: 16, fontSize: 14, color: '#999', lineHeight: 14 }}>输注时间</span>
								<span style={{ width: 180, marginLeft: 16, fontSize: 14, color: '#999', lineHeight: 14 }}>4hrs</span>
							</div>
							<div style={{ height: 26, display: 'flex', alignItems: 'center' }}>
								<span style={{ width: 120, marginLeft: 16, fontSize: 14, color: '#999', lineHeight: 14 }}>测定谷浓度</span>
								<span style={{ width: 180, marginLeft: 16, fontSize: 14, color: '#999', lineHeight: 14 }}>2mg/L</span>
							</div>
							<div style={{ height: 26, display: 'flex', alignItems: 'center' }}>
								<span style={{ width: 120, marginLeft: 16, fontSize: 14, color: '#999', lineHeight: 14 }}>目标谷浓度范围</span>
								<span style={{ width: 180, marginLeft: 16, fontSize: 14, color: '#999', lineHeight: 14 }}>10-15mg/L</span>
							</div>
							<div style={{ height: 26, display: 'flex', alignItems: 'center' }}>
								<span style={{ width: 120, marginLeft: 16, fontSize: 14, color: '#999', lineHeight: 14 }}>MIC</span>
								<span style={{ width: 180, marginLeft: 16, fontSize: 14, color: '#999', lineHeight: 14 }}>0.5mg/L</span>
							</div>
							<div style={{ height: 26, display: 'flex', alignItems: 'center' }}>
								<span style={{ width: 120, marginLeft: 16, fontSize: 14, color: '#999', lineHeight: 14 }}>输注速率</span>
								<span style={{ width: 180, marginLeft: 16, fontSize: 14, color: '#999', lineHeight: 14 }}>32mg/h</span>
							</div>
						</div>
					)
				}}
			/>
		)
	}

	renderBeginConcentration() {
		return (
			<List
				className="list-content"
				header={<div>Header</div>}
				footer={<div>Footer</div>}
				bordered
				dataSource={data}
				renderItem={item => {
					return (
						<div style={{ marginLeft: 16, marginRight: 16, height: 215, background: 'white', marginBottom: 16, widht: '100%', borderRadius: 4 }}>
							<div style={{ height: 68, display: 'flex', alignItems: 'center', paddingLeft: 16, paddingRight: 16 }}>
								<span>2018.12.23 23:55</span>
							</div>
							<div style={{ height: 26, display: 'flex', alignItems: 'center' }}>
								<span style={{ width: 32, marginLeft: 16, fontSize: 14 }}>年龄</span>
								<span style={{ width: 31, marginLeft: 16, fontSize: 14 }}>48</span>
								<span style={{ width: 98, marginLeft: 16, fontSize: 14 }}>血肌酐</span>
								<span style={{ marginLeft: 16, fontSize: 14 }}>20μmoI/L</span>
							</div>
							<div style={{ height: 26, display: 'flex', alignItems: 'center' }}>
								<span style={{ width: 32, marginLeft: 16, fontSize: 14 }}>性别</span>
								<span style={{ width: 31, marginLeft: 16, fontSize: 14 }}>男</span>
								<span style={{ width: 98, marginLeft: 16, fontSize: 14 }}>MIC</span>
								<span style={{ marginLeft: 16, fontSize: 14 }}>1mg/L</span>
							</div>
							<div style={{ height: 26, display: 'flex', alignItems: 'center' }}>
								<span style={{ width: 32, marginLeft: 16, fontSize: 14 }}>身高</span>
								<span style={{ width: 31, marginLeft: 16, fontSize: 14 }}>1.7m</span>
								<span style={{ width: 98, marginLeft: 16, fontSize: 14 }}>剂量</span>
								<span style={{ marginLeft: 16, fontSize: 14 }}>0.5mg</span>
							</div>
							<div style={{ height: 26, display: 'flex', alignItems: 'center' }}>
								<span style={{ width: 32, marginLeft: 16, fontSize: 14 }}>体重</span>
								<span style={{ width: 31, marginLeft: 16, fontSize: 14 }}>72kg</span>
								<span style={{ width: 98, marginLeft: 16, fontSize: 14 }}>给药间隔</span>
								<span style={{ marginLeft: 16, fontSize: 14 }}>24hrs</span>
							</div>
							<div style={{ height: 26, display: 'flex', alignItems: 'center' }}>
								<span style={{ width: 32, marginLeft: 16, fontSize: 14 }}></span>
								<span style={{ width: 31, marginLeft: 16, fontSize: 14 }}></span>
								<span style={{ width: 98, marginLeft: 16, fontSize: 14 }}>输注时间</span>
								<span style={{ marginLeft: 16, fontSize: 14 }}>24hrs</span>
							</div>
						</div>
					)
				}}
			/>
		)
	}

	renderAdjustConcentration() {
		return (
			<List
				className="list-content"
				header={<div>Header</div>}
				footer={<div>Footer</div>}
				bordered
				dataSource={data}
				renderItem={item => {
					return (
						<div style={{ marginLeft: 16, marginRight: 16, height: 305, background: 'white', marginBottom: 16, widht: '100%', borderRadius: 4 }}>
							<div style={{ height: 68, display: 'flex', alignItems: 'center', paddingLeft: 16, paddingRight: 16 }}>
								<span>2018.12.23 23:55</span>
							</div>
							<div style={{ height: 26, display: 'flex', alignItems: 'center' }}>
								<span style={{ width: 120, marginLeft: 16, fontSize: 14, color: '#999', lineHeight: 14 }}>剂量</span>
								<span style={{ width: 180, marginLeft: 16, fontSize: 14, color: '#999', lineHeight: 14 }}>50mg</span>
							</div>
							<div style={{ height: 26, display: 'flex', alignItems: 'center' }}>
								<span style={{ width: 120, marginLeft: 16, fontSize: 14, color: '#999', lineHeight: 14 }}>给药间隔</span>
								<span style={{ width: 180, marginLeft: 16, fontSize: 14, color: '#999', lineHeight: 14 }}>4hrs</span>
							</div>
							<div style={{ height: 26, display: 'flex', alignItems: 'center' }}>
								<span style={{ width: 120, marginLeft: 16, fontSize: 14, color: '#999', lineHeight: 14 }}>输注时间</span>
								<span style={{ width: 180, marginLeft: 16, fontSize: 14, color: '#999', lineHeight: 14 }}>4hrs</span>
							</div>
							<div style={{ height: 26, display: 'flex', alignItems: 'center' }}>
								<span style={{ width: 120, marginLeft: 16, fontSize: 14, color: '#999', lineHeight: 14 }}>测定谷浓度</span>
								<span style={{ width: 180, marginLeft: 16, fontSize: 14, color: '#999', lineHeight: 14 }}>2mg/L</span>
							</div>
							<div style={{ height: 26, display: 'flex', alignItems: 'center', marginTop: 12 }}>
								<span style={{ width: 120, marginLeft: 16, fontSize: 14, color: '#999', lineHeight: 14 }}>MIC</span>
								<span style={{ width: 180, marginLeft: 16, fontSize: 14, color: '#999', lineHeight: 14 }}>1mg/L</span>
							</div>
							<div style={{ height: 26, display: 'flex', alignItems: 'center' }}>
								<span style={{ width: 120, marginLeft: 16, fontSize: 14, color: '#999', lineHeight: 14 }}>剂量</span>
								<span style={{ width: 180, marginLeft: 16, fontSize: 14, color: '#999', lineHeight: 14 }}>1000mg</span>
							</div>
							<div style={{ height: 26, display: 'flex', alignItems: 'center' }}>
								<span style={{ width: 120, marginLeft: 16, fontSize: 14, color: '#999', lineHeight: 14 }}>给药间隔</span>
								<span style={{ width: 180, marginLeft: 16, fontSize: 14, color: '#999', lineHeight: 14 }}>8hrs</span>
							</div>
							<div style={{ height: 26, display: 'flex', alignItems: 'center' }}>
								<span style={{ width: 120, marginLeft: 16, fontSize: 14, color: '#999', lineHeight: 14 }}>输注时间</span>
								<span style={{ width: 180, marginLeft: 16, fontSize: 14, color: '#999', lineHeight: 14 }}>8hrs</span>
							</div>
						</div>
					)
				}}
			/>
		)
	}

	startLoadData() {
		const { value, sessionId, baseUrl } = this.state

	}

	loadMoreData() {

	}
}
