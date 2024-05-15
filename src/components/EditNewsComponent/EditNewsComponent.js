import React, { Component } from 'react'
import './EditNewsComponent.css'

class EditNewsComponent extends Component {
    constructor(props)
    {
        super(props)

        this.state = {
            newsTitle: '',
            newsID:'',
            newsArticle: '',
            newsAuthor: '',
            newsLocation: '',
            newsCategory: ''
        }
    }

    newsTitleHandler = (event) => {
        this.setState({
            newsTitle : event.target.value
        })
    }
    newsIDHandler = (event) => {
        this.setState({
            newsID : event.target.value
        })
    }
    newsArticleHandler = (event) => {
        this.setState({
            newsArticle : event.target.value
        })
    }
    newsAuthorHandler = (event) => {
        this.setState({
            newsAuthor : event.target.value
        })
    }
    newsLocationHandler = (event) => {
        this.setState({
            newsLocation : event.target.value
        })
    }
    newsCategoryHandler = (event) => {
        this.setState({
            newsCategory : event.target.value
        })
    }

    newsIDValidator = () => {
        if (this.state.newsID !== null)
        {
            fetch('http://localhost:3500/api/v1/news/validate',{
                    method:'POST',
                    crossDomain: true,
                    headers: {
                        'Content-type':'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    body: JSON.stringify({
                        newsID : this.state.newsID
                    })
                })
                .then((response) => response.json())
                .then((data) => 
                {
                    console.log(data);
                    this.setState({
                        newsTitle: data.newsTitle,
                        newsID: data.newsID,
                        newsArticle: data.newsArticle,
                        newsAuthor: data.newsAuthor,
                        newsLocation: data.newsLocation,
                        newsCategory: data.newsCategory
                    })
                }
            )
          }
        }
    
    formSubmitHandler = (event) =>{
        event.preventDefault()

        fetch('http://localhost:3500/api/v1/news',{
        method:'PATCH',
        crossDomain: true,
        headers: {
            'Content-type':'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
            newsTitle: this.state.newsTitle,
            newsID : this.state.newsID,
            newsArticle: this.state.newsArticle,
            newsAuthor: this.state.newsAuthor,
            newsLocation: this.state.newsLocation,
            newsCategory: this.state.newsCategory
        })
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.message)
            {
                alert(data.message)
            }
            else{
                alert(`The news on ${data.newsCategory} catrgory is updated successfully`)
                window.location.href = '/'
            }
        })
    }

  render() {
    const {newsTitle, newsID, newsArticle, newsAuthor, newsLocation, newsCategory} = this.state
    return (
        <form className='form-container' onSubmit={this.formSubmitHandler}>
            <h2>Editing news</h2>

        <div className='form-group'>
            <label>News ID</label>
            <input
            type='text'
            placeholder='Enter the news ID'
            value={newsID}
            onChange={this.newsIDHandler}
            required
            />
        </div>

        <div className='form-group'>
            <button onClick={this.newsIDValidator}>Check</button>
        </div>

        <div className='form-group'>
            <label>News Title</label>
            <input
            type='text'
            placeholder='Enter the news title'
            value={newsTitle}
            onChange={this.newsTitleHandler}
            required
            />
        </div>

        <div className='form-group'>
            <label>News Article</label>
            <textarea
            type='text'
            rows='10'
            placeholder='Enter the company name'
            value={newsArticle}
            onChange={this.newsArticleHandler}
            required
            />
        </div>

        <div className='form-group'>
            <label>News Author</label>
            <input
            type='text'
            placeholder='Enter the news author'
            value={newsAuthor}
            onChange={this.newsAuthorHandler}
            required
            />
        </div>

        <div className='form-group'>
            <label>News Location</label>
            <input
            type='text'
            placeholder='Enter the news location'
            value={newsLocation}
            onChange={this.newsLocationHandler}
            required
            />
        </div>

        <div className='form-group'>
            <label>News Category</label>
            <select
            value={newsCategory}
            onChange={this.newsCategoryHandler}
            required
            >
            <option value="">-- Please select --</option>
            <option value="Sports">Sports</option>
            <option value="Politics">Politics</option>
            <option value="Cinema">Cinema</option>
            <option value="Economics">Economics</option>
            </select>
        </div>

        <div>
            <button type='submit'>Update</button>
        </div>
        </form>
        
    )
  }
}


export default EditNewsComponent