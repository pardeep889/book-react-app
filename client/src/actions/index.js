import axios from 'axios';

export function getBooks(limit = 10,start=0,order='asc', list = ''){

    const request = axios.get(`api/getBooks?limit=${limit}&skip=${start}&order=${order}`)
    .then(res=>{
                if(list){
                    return [...list,...res.data]
                }else{
                    return res.data
                }
        })
    .catch(console.error());
    return{
        type: 'GET_BOOKS',
        payload: request
    }
}

export function getBookWithReviewer(id){
    const request = axios.get(`/api/getBook?id=${id}`);
        return (dispatch) => {
            request.then(({data}) => {
                let book = data;
                axios.get(`/api/getReviewer?id=${book.ownerId}`).then((data) => {
                    let res = {
                        book,
                        reviewer: data.data
                    }
                    console.log(res)
                    dispatch({
                        type: 'GET_BOOK_WITH_REVIEWER',
                        payload: res
                    })
                })
             
            })
        }    
}
export function clearBookWithReviewer(){
    return {
        type: "CLEAR_BOOK_WITH_REVIEWER",
        payload: {
            book: {},
            reviewer: {}
        }
    }
}

export function addBook(book){
    const req = axios.post('/api/book',book).then(resp => resp.data).catch(console.error());
    return{
        type: "ADD_BOOK",
        payload: req
    }
}
export function clearNewBook(){
    return{
        type: "CLEAR_NEW_BOOK",
        payload: {}
    }
}

export function getBook(id){
    const req = axios.get(`/api/getBook?id=${id}`).then(resp => resp.data).catch(console.error());
    return {
        type: "GET_BOOK",
        payload: req
    }
}
export function updateBook(data){
    const req = axios.post(`/api/bookUpdate`,data).then(resp => resp.data).catch(console.error());
    return{
        type: 'UPDATE_BOOK',
        payload: req
    }
}
export function deleteBook(id){
    const req = axios.delete(`/api/deleteBook?id=${id}`).then(resp => resp.data).catch(console.error());
    return {
        type: "DELETE_BOOK",
        payload: req
    }
}
export function clearBook(){
    return {
        type: "CLEAR_BOOK",
        payload:{
            book:null,
            updateBook: false,
            postDeleted: false
        }
    }   
}