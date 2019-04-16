/********************************
 * @file: home page
 * @desc: overview react multi page app
 * @author: leinov
 * @date:2018-12-06
 *******************************/

import React, { Component } from "react";

import "./app.scss"
import { List } from 'antd';
import axios from 'axios'

import InfiniteScroll from 'react-infinite-scroll-component';

axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'application/json';

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: 0,
			baseUrl: null,
			sessionId: "602f2775c25c4466af8a8086d5300a58",
			dataIndex: 0,
			totalPage: 1,
			pageIndex: 0,
			data: [],
			loading: false
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
				dataIndex: parseInt(messages[0])
			})
		});
		this.fetchData()
		// this.startLoadData()
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
		const { value, dataIndex = 0, sessionId } = this.state;
		console.log('renderContent',dataIndex)
		switch (parseInt(dataIndex)) {
			case 0:
				return (
					<div className="index-content">
						{this.renderBeginConcentration()}
					</div>
				)
			case 1:
				return (
					<div className="index-content">
						{this.renderAdjustConcentration()}
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
						{this.renderBeginDose()}
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
		const { data, sessionId } = this.state;
		return (
			<InfiniteScroll
				className="scroll-view"
				dataLength={data.length} //This is important field to render the next data
				next={this.fetchData.bind(this)}
				hasMore={true}
				loader={<h4 style={{ color:  '#fff', textAlign: 'center'}}>加载中...</h4>}
				// style={{ width: '100%'}}
				endMessage={
					<p style={{ textAlign: 'center', color: '#fff' }}>
						<b>已经到底了！</b>
					</p>
				}
				// below props only if you need pull down functionality
				refreshFunction={this.refresh.bind(this)}
				pullDownToRefresh
				pullDownToRefreshContent={
					<h3 style={{ textAlign: 'center', color: '#fff' }}>下拉刷新</h3>
				}
				releaseToRefreshContent={
					<h3 style={{ textAlign: 'center', color: '#fff' }}>松开刷新</h3>
				}>
				{data.map((val, index) => {
					return (
						<div style={{ marginLeft: 16, marginRight: 16, height: 214, background: 'white', marginBottom: 16, borderRadius: 4, marginTop: 12 }}>
							<div style={{ height: 68, display: 'flex', alignItems: 'center', paddingLeft: 16, paddingRight: 16 }}>
								<span>{val.DateTime}</span>
							</div>
							<div style={{ height: 26, display: 'flex', alignItems: 'center' }}>
								<span style={{ width: 28, marginLeft: 16, fontSize: 14 }}>年龄</span>
								<span style={{ width: 31, marginLeft: 16, fontSize: 14 }}>{val.Age}</span>
								<span style={{ width: 98, marginLeft: 16, fontSize: 14 }}>血肌酐</span>
								<span style={{ marginLeft: 16, fontSize: 14 }}>{val.Scr}{val.ScrUnit}</span>
							</div>
							<div style={{ height: 26, display: 'flex', alignItems: 'center' }}>
								<span style={{ width: 28, marginLeft: 16, fontSize: 14 }}>性别</span>
								<span style={{ width: 31, marginLeft: 16, fontSize: 14 }}>{val.Female ? '女' : '男'}</span>
								<span style={{ width: 98, marginLeft: 16, fontSize: 14 }}>MIC</span>
								<span style={{ marginLeft: 16, fontSize: 14 }}>{val.MIC}mg/L</span>
							</div>
							<div style={{ height: 26, display: 'flex', alignItems: 'center' }}>
								<span style={{ width: 28, marginLeft: 16, fontSize: 14 }}>身高</span>
								<span style={{ width: 31, marginLeft: 16, fontSize: 14 }}>{val.Height}m</span>
								<span style={{ width: 98, marginLeft: 16, fontSize: 14 }}>剂量</span>
								<span style={{ marginLeft: 16, fontSize: 14 }}>{val.Dose}mg</span>
							</div>
							<div style={{ height: 26, display: 'flex', alignItems: 'center' }}>
								<span style={{ width: 28, marginLeft: 16, fontSize: 14 }}>体重</span>
								<span style={{ width: 31, marginLeft: 16, fontSize: 14 }}>{val.Weight}kg</span>
								<span style={{ width: 98, marginLeft: 16, fontSize: 14 }}>给药间隔</span>
								<span style={{ marginLeft: 16, fontSize: 14 }}>{val.Tau}hrs</span>
							</div>
							<div style={{ height: 26, display: 'flex', alignItems: 'center' }}>
								<span style={{ width: 28, marginLeft: 16, fontSize: 14 }}></span>
								<span style={{ width: 31, marginLeft: 16, fontSize: 14 }}></span>
								<span style={{ width: 98, marginLeft: 16, fontSize: 14 }}>输注时间</span>
								<span style={{ marginLeft: 16, fontSize: 14 }}>{val.ti}hrs</span>
							</div>
						</div>
					)
				})}
			</InfiniteScroll>
		)
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
		const { data } = this.state;
		return (
			<InfiniteScroll
				className="scroll-view"
				dataLength={data.length} //This is important field to render the next data
				next={this.fetchData.bind(this)}
				hasMore={true}
				loader={<h4 style={{ color: '#fff', textAlign: 'center' }}>加载中...</h4>}
				// style={{ width: '100%'}}
				endMessage={
					<p style={{ textAlign: 'center', color: '#fff' }}>
						<b>已经到底了！</b>
					</p>
				}
				// below props only if you need pull down functionality
				refreshFunction={this.refresh.bind(this)}
				pullDownToRefresh
				pullDownToRefreshContent={
					<h3 style={{ textAlign: 'center', color: '#fff' }}>下拉刷新</h3>
				}
				releaseToRefreshContent={
					<h3 style={{ textAlign: 'center', color: '#fff' }}>松开刷新</h3>
				}>
				{data.map((val, index) => {
					return (
						<div style={{ marginLeft: 16, marginRight: 16, height: 320, background: 'white', marginBottom: 16, marginTop: 12, borderRadius: 4 }}>
							<div style={{ height: 68, display: 'flex', alignItems: 'center', paddingLeft: 16, paddingRight: 16 }}>
								<span>2018.12.23 23:55</span>
							</div>
							<div style={{ height: 26, display: 'flex', alignItems: 'center' }}>
								<span style={{ width: 120, marginLeft: 16, fontSize: 14, color: '#999', lineHeight: 14 }}>剂量</span>
								<span style={{ width: 180, marginLeft: 16, fontSize: 14, color: '#999', lineHeight: 14 }}>{val.PDose}mg</span>
							</div>
							<div style={{ height: 26, display: 'flex', alignItems: 'center' }}>
								<span style={{ width: 120, marginLeft: 16, fontSize: 14, color: '#999', lineHeight: 14 }}>给药间隔</span>
								<span style={{ width: 180, marginLeft: 16, fontSize: 14, color: '#999', lineHeight: 14 }}>{val.PTau}hrs</span>
							</div>
							<div style={{ height: 26, display: 'flex', alignItems: 'center' }}>
								<span style={{ width: 120, marginLeft: 16, fontSize: 14, color: '#999', lineHeight: 14 }}>输注时间</span>
								<span style={{ width: 180, marginLeft: 16, fontSize: 14, color: '#999', lineHeight: 14 }}>{val.Pti}hrs</span>
							</div>
							<div style={{ height: 26, display: 'flex', alignItems: 'center' }}>
								<span style={{ width: 120, marginLeft: 16, fontSize: 14, color: '#999', lineHeight: 14 }}>测定谷浓度</span>
								<span style={{ width: 180, marginLeft: 16, fontSize: 14, color: '#999', lineHeight: 14 }}>{val.PCmin}mg/L</span>
							</div>
							<div style={{ height: 26, display: 'flex', alignItems: 'center' }}>
								<span style={{ width: 120, marginLeft: 16, fontSize: 14, color: '#999', lineHeight: 14 }}></span>
								<span style={{ width: 180, marginLeft: 16, fontSize: 14, color: '#999', lineHeight: 14 }}></span>
							</div>
							<div style={{ height: 26, display: 'flex', alignItems: 'center' }}>
								<span style={{ width: 120, marginLeft: 16, fontSize: 14, color: '#999', lineHeight: 14 }}>MIC</span>
								<span style={{ width: 180, marginLeft: 16, fontSize: 14, color: '#999', lineHeight: 14 }}>{val.MIC}mg/L</span>
							</div>
							<div style={{ height: 26, display: 'flex', alignItems: 'center' }}>
								<span style={{ width: 120, marginLeft: 16, fontSize: 14, color: '#999', lineHeight: 14 }}>剂量</span>
								<span style={{ width: 180, marginLeft: 16, fontSize: 14, color: '#999', lineHeight: 14 }}>{val.PDose}mg</span>
							</div>
							<div style={{ height: 26, display: 'flex', alignItems: 'center' }}>
								<span style={{ width: 120, marginLeft: 16, fontSize: 14, color: '#999', lineHeight: 14 }}>给药间隔</span>
								<span style={{ width: 180, marginLeft: 16, fontSize: 14, color: '#999', lineHeight: 14 }}>{val.Tau}hrs</span>
							</div>
							<div style={{ height: 26, display: 'flex', alignItems: 'center' }}>
								<span style={{ width: 120, marginLeft: 16, fontSize: 14, color: '#999', lineHeight: 14 }}>输注时间</span>
								<span style={{ width: 180, marginLeft: 16, fontSize: 14, color: '#999', lineHeight: 14 }}>{val.ti}hrs</span>
							</div>
						</div>
					)
				})}
			</InfiniteScroll>
		)
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
		const { data } = this.state;
		return (
			<InfiniteScroll
				className="scroll-view"
				dataLength={data.length} //This is important field to render the next data
				next={this.fetchData.bind(this)}
				hasMore={true}
				loader={<h4 style={{ color: '#fff', textAlign: 'center' }}>加载中...</h4>}
				// style={{ width: '100%'}}
				endMessage={
					<p style={{ textAlign: 'center', color: '#fff' }}>
						<b>已经到底了！</b>
					</p>
				}
				// below props only if you need pull down functionality
				refreshFunction={this.refresh.bind(this)}
				pullDownToRefresh
				pullDownToRefreshContent={
					<h3 style={{ textAlign: 'center', color: '#fff' }}>下拉刷新</h3>
				}
				releaseToRefreshContent={
					<h3 style={{ textAlign: 'center', color: '#fff' }}>松开刷新</h3>
				}>
				{data.map((val, index) => {
					return (
						<div style={{ marginLeft: 16, marginRight: 16, height: 215, background: 'white', marginBottom: 16, borderRadius: 4, marginTop:12 }}>
							<div style={{ height: 68, display: 'flex', alignItems: 'center', paddingLeft: 16, paddingRight: 16 }}>
								<span>{val.DateTime}</span>
							</div>
							<div style={{ height: 26, display: 'flex', alignItems: 'center' }}>
								<span style={{ width: 32, marginLeft: 16, fontSize: 14 }}>年龄</span>
								<span style={{ width: 31, marginLeft: 16, fontSize: 14 }}>{val.Age}</span>
								<span style={{ width: 98, marginLeft: 16, fontSize: 14 }}>血肌酐</span>
								<span style={{ marginLeft: 16, fontSize: 14 }}>{val.Scr}{val.ScrUnit}</span>
							</div>
							<div style={{ height: 26, display: 'flex', alignItems: 'center' }}>
								<span style={{ width: 32, marginLeft: 16, fontSize: 14 }}>性别</span>
								<span style={{ width: 31, marginLeft: 16, fontSize: 14 }}>{val.Female ? '女':'男'}</span>
								<span style={{ width: 98, marginLeft: 16, fontSize: 14 }}>MIC</span>
								<span style={{ marginLeft: 16, fontSize: 14 }}>{val.MIC}mg/L</span>
							</div>
							<div style={{ height: 26, display: 'flex', alignItems: 'center' }}>
								<span style={{ width: 32, marginLeft: 16, fontSize: 14 }}>身高</span>
								<span style={{ width: 31, marginLeft: 16, fontSize: 14 }}>{val.Height}m</span>
								<span style={{ width: 98, marginLeft: 16, fontSize: 14 }}>剂量</span>
								<span style={{ marginLeft: 16, fontSize: 14 }}>{val.Dose}mg</span>
							</div>
							<div style={{ height: 26, display: 'flex', alignItems: 'center' }}>
								<span style={{ width: 32, marginLeft: 16, fontSize: 14 }}>体重</span>
								<span style={{ width: 31, marginLeft: 16, fontSize: 14 }}>{val.Weight}kg</span>
								<span style={{ width: 98, marginLeft: 16, fontSize: 14 }}>给药间隔</span>
								<span style={{ marginLeft: 16, fontSize: 14 }}>{val.Tau}hrs</span>
							</div>
							<div style={{ height: 26, display: 'flex', alignItems: 'center' }}>
								<span style={{ width: 32, marginLeft: 16, fontSize: 14 }}></span>
								<span style={{ width: 31, marginLeft: 16, fontSize: 14 }}></span>
								<span style={{ width: 98, marginLeft: 16, fontSize: 14 }}>输注时间</span>
								<span style={{ marginLeft: 16, fontSize: 14 }}>{val.ti}hrs</span>
							</div>
						</div>
					)
				})}
			</InfiniteScroll>
		)
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

	renderPKView () {
		
	}

	fetchData() {
		const { sessionId } = this.state
		if (sessionId == null || sessionId == 'null') {
			return;
		}
		console.log('begin fetch', this.state)
		if (this.state.pageIndex < this.state.totalPage && !this.state.loading) {
			this.setState({
				loading: true
			}, () => {
				console.log('begin axios')
				this.axiosData(this.state.pageIndex + 1)
			})
		}
		
	}

	refresh() {
		const { sessionId } = this.state
		if (sessionId == null || sessionId == 'null') {
			return;
		}
		console.log('begin refresh')
		if (!this.state.loading) {
			this.setState({
				loading: true,
				data: [],
				pageIndex: 0,
				totalPage: 1
			}, () => {
				this.axiosData(this.state.pageIndex + 1);
			})
		}
		
	}

	renderAdjustConcentration() {
		const { data } = this.state;
		return (
			<InfiniteScroll
				className="scroll-view"
				dataLength={data.length} //This is important field to render the next data
				next={this.fetchData.bind(this)}
				hasMore={true}
				loader={<h4 style={{ color: '#fff', textAlign: 'center' }}>加载中...</h4>}
				endMessage={
					<p style={{ textAlign: 'center', color: '#fff' }}>
						<b>已经到底了！</b>
					</p>
				}
				// below props only if you need pull down functionality
				refreshFunction={this.refresh.bind(this)}
				pullDownToRefresh
				pullDownToRefreshContent={
					<h3 style={{ textAlign: 'center', color: '#fff' }}>下拉刷新</h3>
				}
				releaseToRefreshContent={
					<h3 style={{ textAlign: 'center', color: '#fff' }}>松开刷新</h3>
				}>
				{data.map((val, index) => {
					return (
						<div style={{ marginLeft: 16, marginRight: 16, height: 305, background: 'white', marginBottom: 16, borderRadius: 4, marginTop: 12 }}>
							<div style={{ height: 68, display: 'flex', alignItems: 'center', paddingLeft: 16, paddingRight: 16 }}>
								<span>{val.DateTime}</span>
							</div>
							<div style={{ height: 26, display: 'flex', alignItems: 'center' }}>
								<span style={{ width: 120, marginLeft: 16, fontSize: 14, color: '#999', lineHeight: 14 }}>剂量</span>
								<span style={{ width: 180, marginLeft: 16, fontSize: 14, color: '#999', lineHeight: 14 }}>{val.PDose}mg</span>
							</div>
							<div style={{ height: 26, display: 'flex', alignItems: 'center' }}>
								<span style={{ width: 120, marginLeft: 16, fontSize: 14, color: '#999', lineHeight: 14 }}>给药间隔</span>
								<span style={{ width: 180, marginLeft: 16, fontSize: 14, color: '#999', lineHeight: 14 }}>{val.PTau}hrs</span>
							</div>
							<div style={{ height: 26, display: 'flex', alignItems: 'center' }}>
								<span style={{ width: 120, marginLeft: 16, fontSize: 14, color: '#999', lineHeight: 14 }}>输注时间</span>
								<span style={{ width: 180, marginLeft: 16, fontSize: 14, color: '#999', lineHeight: 14 }}>{val.Pti}hrs</span>
							</div>
							<div style={{ height: 26, display: 'flex', alignItems: 'center' }}>
								<span style={{ width: 120, marginLeft: 16, fontSize: 14, color: '#999', lineHeight: 14 }}>测定谷浓度</span>
								<span style={{ width: 180, marginLeft: 16, fontSize: 14, color: '#999', lineHeight: 14 }}>{val.PCmin}mg/L</span>
							</div>
							<div style={{ height: 26, display: 'flex', alignItems: 'center', marginTop: 12 }}>
								<span style={{ width: 120, marginLeft: 16, fontSize: 14, color: '#999', lineHeight: 14 }}>目标浓度范围</span>
								<span style={{ width: 180, marginLeft: 16, fontSize: 14, color: '#999', lineHeight: 14 }}>{val.ExpectCminLow}-{val.ExpectCminUpper}mg/L</span>
							</div>
							<div style={{ height: 26, display: 'flex', alignItems: 'center' }}>
								<span style={{ width: 120, marginLeft: 16, fontSize: 14, color: '#999', lineHeight: 14 }}>MIC</span>
								<span style={{ width: 180, marginLeft: 16, fontSize: 14, color: '#999', lineHeight: 14 }}>{val.MIC}mg/L</span>
							</div>
							<div style={{ height: 26, display: 'flex', alignItems: 'center' }}>
								<span style={{ width: 120, marginLeft: 16, fontSize: 14, color: '#999', lineHeight: 14 }}>输注速率</span>
								<span style={{ width: 180, marginLeft: 16, fontSize: 14, color: '#999', lineHeight: 14 }}>{val.Rate}mg/h</span>
							</div>
							{/* <div style={{ height: 26, display: 'flex', alignItems: 'center' }}>
								<span style={{ width: 120, marginLeft: 16, fontSize: 14, color: '#999', lineHeight: 14 }}>输注时间</span>
								<span style={{ width: 180, marginLeft: 16, fontSize: 14, color: '#999', lineHeight: 14 }}>8hrs</span>
							</div> */}
						</div>
					)
				})}
			</InfiniteScroll>
		)
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

	axiosData(index) {
		const { sessionId, baseUrl, dataIndex } = this.state;
		let url = '/Huashan.WebAPI/API/WxApp/QuerySolutions'
		const data = {
			pageIndex: index,
			pageSize: 10,
			CalcType: dataIndex
		}

		console.log('axios', data, sessionId)

		axios({
			url: url,
			method: 'POST',
			headers: {
				SessionID: sessionId
			},
			data: data
		}).then(res => {
			console.log('res', res);
			const {
				State,
				Data,
				ErrorMessage,
				Page
			} = res.data;

			if (State == 1) {
				this.setState({
					data: [...this.state.data, ...Data],
					pageIndex: Page.PageIndex,
					totalPage: Page.TotalPage
				})
			} else {
				console.log('请求错误')
			}
			this.setState({
				loading: false
			})
		})
	}

	startLoadData() {
		const { value, sessionId, baseUrl } = this.state
		let url = baseUrl + 'API/WxApp/Medicines'
		const data = {
			pageIndex: 1,
			pageSize: 10,
			CalcType: this.state.dataIndex
		}
		console.log('startloaddata', data)
		axios({
			method: 'POST',
			url: '/Huashan.WebAPI/API/WxApp/QuerySolutions',
			headers: {
				SessionID: sessionId,
			},
			data: data

		}).then(res => {
			console.log('res', res);
			const {
				State,
				Data,
				ErrorMessage,
				Page
			} = res.data;

			if (State == 1) {
				this.setState({
					data: [this.state.data, ...Data],
					pageIndex: Page.PageIndex,
					totalPage: Page.TotalPage
				})
			} else {
				console.log('请求错误')
			}
		})
	}

	loadMoreData() {

	}
}
