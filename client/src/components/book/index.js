import React from 'react';
import BookContainer from '../../containers/book_container';
const BookView = (props)  => {
    return(
        <div>
            <BookContainer {...props}/>
        </div>
    )
}
export default BookView;