import PropTypes from 'prop-types';
import React from 'react';
import { isBrowser, isMobile } from "react-device-detect";
import ItemsListBanner from './Items-list-banner';
import Breadcrumbs from './Breadcrumbs';
import ItemsListSidebar from './Items-list-sidebar';
import Paginator from './Paginator';
import EachItemInList from './Each-item-in-list'; 
import LoadingGif from './Loading-gif';
import ButtonLinkGenderPage from './Button-link-gender-page'
import { 
  Container,
  Row,
  Col
} from 'reactstrap';
import '../style/shimmer.css';

const ShimmerGrid =()=>{
  return(
    <div style={{height:'100vh'}}> 
      <div className="comment br dark animate w100 mx-1 my-3" style={{height:'5vh', width:'66vw'}}/>
      <div className="d-flex" style={{flexFlow:'row wrap'}}> 
      <div className="comment br dark animate w100 mx-1 my-2" style={{height:'40vh', width:'46vw'}}/>
      <div className="comment br dark animate w100 mx-1 my-2" style={{height:'40vh', width:'46vw'}}/>
      <div className="comment br dark animate w100 mx-1 my-2" style={{height:'40vh', width:'46vw'}}/>
      <div className="comment br dark animate w100 mx-1 my-2" style={{height:'40vh', width:'46vw'}}/>
      </div>
    </div>
  )
}


const propTypes = {
  listIsLoading: PropTypes.bool.isRequired, 
  FilteredSortedList: PropTypes.array.isRequired, 
  keywordsForFilter: PropTypes.array.isRequired, 
  oneKeywordForFilter: PropTypes.func.isRequired,
  currentPageHandler: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  itemsMaxPage: PropTypes.number.isRequired,
  dispatchSize: PropTypes.func.isRequired,
  sortSizeForFilter: PropTypes.string.isRequired,
  sortArgsForFilter: PropTypes.string.isRequired,
  dispatchToSortList: PropTypes.func.isRequired,
  keywordsSelectAction: PropTypes.func.isRequired,
  categoriesProducts: PropTypes.object.isRequired,
  actionPriceRangeFilter: PropTypes.func.isRequired,
  reducerPriceRangeFilter: PropTypes.number.isRequired,
  actionFillFilters: PropTypes.func.isRequired
}

const styles = {
  spaceColumn: {
    marginLeft: '5px',
    marginRight: '5px',
    marginBottom: '50px',
    width : '20%'
  },
  fontSize: {
    fontSize: '15px'
  },
  marginLeftBtn: {
    marginLeft: '30px'
  },
  containerPaddingTop: {
    paddingTop: '35px',
    minHeight:'100vh'
    
  }
};

const ItemsList = ({
  match, 
  listIsLoading,
  touchme,
  FilteredSortedList,
  keywordsForFilter,
  oneKeywordForFilter,
  currentPageHandler,
  currentPage,
  itemsMaxPage,
  dispatchSize,
  sortSizeForFilter,
  sortArgsForFilter,
  dispatchToSortList,
  keywordsSelectAction,
  categoriesProducts,
  actionPriceRangeFilter,
  reducerPriceRangeFilter,
  actionFillFilters
}) => {

  const { gender } = match.params;
  const listLength = FilteredSortedList.length
  const loading_logic = listIsLoading && <ShimmerGrid />;
  const pagination = Math.ceil(listLength/itemsMaxPage)>1 ? 
    (<Paginator  
      maxPages={Math.ceil(listLength/itemsMaxPage)} 
      currentPage={currentPage} 
      itemsMaxPage={itemsMaxPage} 
      onPageChange={currentPageHandler}
    />) : 
    currentPage > 1 && (()=> currentPageHandler('empty'))()



  const itemsListByGender_logic = 
  
    <Col md={{ size: 9, order: 1 }} style={{padding:'5px 10px', color:'#fff'}}>
      {listIsLoading === false && <i>Showing {listLength} {listLength>1?"Items":"Item"} </i>}
      {FilteredSortedList.length === 0 && listIsLoading === false && 
      <div style={{ display: 'flex', alignItems: 'center'}}>
        <h2><i>No Items Found</i> </h2>
        <ButtonLinkGenderPage gender='men'/>
        <ButtonLinkGenderPage gender='women'/>
      </div>}
      <div style ={{ display: 'flex',flexFlow: 'row wrap',}} >
        {loading_logic} {/* if list is loading show loader */}
        <EachItemInList 
        touchme = {touchme}
          FilteredSortedList={FilteredSortedList} 
          currentPage={currentPage}
          itemsMaxPage={itemsMaxPage}
          currentPageHandler={currentPageHandler}
          listIsLoading={listIsLoading}
        />
      </div>
      {pagination}
    </Col>;

    const sideBar =  isBrowser &&
    <Col md="3" xs='12'>
      <Row>
        <ItemsListSidebar 
          keywordsForFilter={keywordsForFilter} 
          dispatchSize={dispatchSize}
          sortSizeForFilter={sortSizeForFilter}
          keywordsSelectAction={keywordsSelectAction}
          categoriesProducts={categoriesProducts}
          actionPriceRangeFilter={actionPriceRangeFilter}
          reducerPriceRangeFilter={reducerPriceRangeFilter}
          oneKeywordForFilter={oneKeywordForFilter}
          gender={gender}
          actionFillFilters={actionFillFilters}
        />
      </Row>
    </Col>;


  return (
    <div style={{backgroundImage: 'linear-gradient(10deg, #222, #111',
    backgroundSize: 'contain',}}>
       {/* <ItemsListBanner 
        gender={gender} 
        reducerPriceRangeFilter={reducerPriceRangeFilter}
        sortSizeForFilter={sortSizeForFilter}
        keywordsForFilter={keywordsForFilter}
        sortArgsForFilter={sortArgsForFilter}
      /> */}
      <Breadcrumbs 
      sortbutton={true}
        selectedCategory={keywordsForFilter} 
        keywordsForFilter={keywordsForFilter}
        sortArgsForFilter = {sortArgsForFilter}
        dispatchToSortList = {dispatchToSortList}
        gender={gender} 
        backgroundColor={'#000'}
        textColor={'white'}
        marginTop={-34}
        showSortBtn={keywordsForFilter.length > 0}
        showFilterBtn={true}
        dispatchSize={dispatchSize}
        sortSizeForFilter={sortSizeForFilter}
        keywordsSelectAction={keywordsSelectAction}
        categoriesProducts={categoriesProducts}
        actionPriceRangeFilter={actionPriceRangeFilter}
        reducerPriceRangeFilter={reducerPriceRangeFilter}
        listLength={listLength}
      />
      <Container style={styles.containerPaddingTop}>
        <Row>
          {itemsListByGender_logic} {/* show list depending on gender  */}
          {sideBar}
        </Row>
      </Container>
    </div>
  );
};

ItemsList.propTypes = propTypes;

export default ItemsList;
