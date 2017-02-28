import React, {Component, PropTypes} from 'react';
import {
	StyleSheet,
	View,
	Text,
	Dimensions,
	TouchableOpacity,
	ListView,
} from 'react-native';
import CityList from './city'

var ds = new ListView.DataSource({
    rowHasChanged : (row1, row2) => row1 !== row2,
    sectionHeaderHasChanged : (s1, s2) => s1 !== s2
});

class CityListPage extends React.Component{
	constructor(props) {
	  super(props);
	  this.letterList=[];
	  for(item in CityList)
	  {
      	this.letterList.push(item);
	  }

	}
	setVisibleListHeight(offset) {
		this.visibleListHeight = Dimensions.get('window').height - 64 - offset;
	}
	scrollTo(letter) {
	// find position of first country that starts with letter
		const clickIndex =  this.letterList.indexOf(letter);
		let itemCount = 0;
		let allItemCount = 0;
		this.letterList.map((letter,index)=>{
			if (index<clickIndex) {
				itemCount+=CityList[letter].length;
			}
			allItemCount+=CityList[letter].length;
		})
		let position =  itemCount*50 + clickIndex*25;
		this.listHeight = allItemCount*50 + this.letterList.length*25;
		// do not scroll past the end of the list
		if (position + this.visibleListHeight > this.listHeight) {
		  position = this.listHeight - this.visibleListHeight;
		}

		// scroll
		this._listView.scrollTo({
		  y: position,
		});
	}
	_renderLetters(letter, index) {
	return (
	  <TouchableOpacity
	    key={index}
	    onPress={() => this.scrollTo(letter)}
	    activeOpacity={0.6}
	  >
	    <View style={styles.letter}>
	      <Text style={styles.letterText}>{letter}</Text>
	    </View>
	  </TouchableOpacity>
	);
	}

	_renderRowView(rowData, secId, rowId) {
		console.log(rowData,secId,rowId);
			return(
				<View style={{flex: 1, flexDirection:'column'}}>
					<TouchableOpacity style={styles.cell} onPress={()=>{
					}}>
					<Text style={styles.lable}>{rowData.name}</Text>
					</TouchableOpacity>
				  <View style={{marginLeft:20,marginRight:20, height: 0.5, backgroundColor: '#e1e3e9',}}></View>
				</View>
			)
	}
    _renderSectionHeader(sectionData, sectionID){
      return(
      	<View key={sectionID} style={{flexDirection:'row',height:25,backgroundColor:'#f5f6fa',alignItems:'center'}}>
			<Text style={{marginLeft:20,fontSize:14,color:'#999999'}}>{sectionID}</Text>
	    </View>
      	)
    }

    render(){
    	return(
    		<View>
				<ListView
					ref={listView => this._listView = listView}
					dataSource={ds.cloneWithRowsAndSections(CityList)}
					renderRow={this._renderRowView.bind(this)}
					renderSectionHeader={this._renderSectionHeader.bind(this)}
					onLayout={
					({ nativeEvent: { layout: { y: offset } } }) => this.setVisibleListHeight(offset)
					}
				/>
				<View style={styles.letters}>
				{this.letterList.map((letter, index) => this._renderLetters(letter, index))}
				</View>
			</View>
    		)
       
    }

}
let styles = StyleSheet.create({
  title:{
     fontSize:16,
     color: '#12b7f5',
  },
  closeBtn:{
  },
  lable:{
  	marginLeft:20,
  	marginRight:15,
    fontSize: 15,
    color: '#333333',
  },
  cell:{
     flex:1,
     height:49.5,
     backgroundColor:'white',
     justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
  },
  innerContainer: {
  	height:Dimensions.get('window').height -64,
  	backgroundColor: '#fff',
  },
  typeList:{
    position: 'absolute',
    height:Dimensions.get('window').height -64,
    top: 0,
    bottom: 0,
    right: 0,
    left:Dimensions.get('window').width,
    backgroundColor: 'white',
    flexDirection:'row',
  },

  letters: {
    position: 'absolute',
    height:Dimensions.get('window').height -64,
    paddingTop: 50,
    paddingBottom: 50,
    right: 0,
    backgroundColor: 'transparent',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  letter: {
    height: 20,
    width: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  letterText:{
  	fontSize:14,
    color:'#515151',
  }

});
export default CityListPage;
