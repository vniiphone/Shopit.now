import React, { Component } from 'react';
import _ from 'lodash';

class Pagination extends Component {

    render() {

        const {itemCount,pageSize,onPageChange,currentPage,start,end}=this.props;
        const pageCount=Math.ceil(itemCount/pageSize);
        if(pageCount===1) return null;
        const pages=_.range(1,pageCount+1);
        return (
            <ul className="pagination">
                {pages.map((i,index)=>(i>=start && i<=end)?
                        <li className={i===currentPage?'selected-page':''} onClick={()=>onPageChange(i,pages.length)} key={index}>{i}</li>
                    : ""
                )}
            </ul>
        );
    }
}

export default Pagination;