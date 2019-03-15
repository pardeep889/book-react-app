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
