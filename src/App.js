import Header from './Header';
import Nav from './Nav';
import Footer from './Footer';
import Home from './Home';
import PostPage from './PostPage';
import NewPost from './NewPost';
import About from './About';
import Missing from './Missing';
import { BrowserRouter as Router, Routes, Route, useNavigate} from 'react-router-dom';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';



function App() {

  const navigate = useNavigate();
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [posts, setPosts] =useState([
    {
      id: 1,
      title: "1st post",
      datetime: "July 16, 2021 11:47:39 AM",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
      id: 2,
      title: "Second post",
      datetime: "July 16, 2021 11:47:48 AM",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. two"
    },
    {
      id: 3,
      title: "Number Three",
      datetime: "July 16, 2021 11:48:01 AM",
      body: "Third post... Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
      id: 4,
      title: "Testing a 4th post",
      datetime: "August 02, 2021 11:46:27 AM",
      body: "Some more testing paragraphs!"
    }
  ]);
  useEffect(()=>{
    const searchResults = posts.filter(x=>((x.title).toLowerCase()).includes(search.toLowerCase()) ||
                                        ((x.body).toLowerCase()).includes(search.toLowerCase()));
    setSearchResults(searchResults.reverse());
  },[posts, search])   
  const handleDelete = (id) => {
    const filteredPosts = posts.filter(x=>x.id !== id);
    setPosts(filteredPosts);
    navigate('/');
  }
  const handleSubmit = (e)=>{  
    e.preventDefault();
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const id = posts.length ? posts[posts.length-1].id+1:1
    const newPost = {id, title: postTitle,body:postBody, datetime};
    const allPosts = [...posts, newPost];
    setPosts(allPosts);
    setPostTitle('');
    setPostBody('');
    navigate('/')
  }
  return (
    <div className="App">
      <Header title='React JS' />
      <Nav search={search} setSearch={setSearch}/>
        <Routes>
          <Route exact path="/" element={ <Home posts = {searchResults}/> }/>
          <Route exact path="/post" element=
          { 
          <NewPost postTitle={postTitle} 
                   setPostTitle={setPostTitle }
                   postBody={postBody}
                   setPostBody={setPostBody}
                   handleSubmit={handleSubmit} /> 
          } />
          <Route path="/post/:id" element={ <PostPage posts={posts} handleDelete = {handleDelete}/> } />
          <Route exact path="/about" element={ <About /> } />
          <Route path="*" element={ <Missing /> } />
        </Routes>
      <Footer />
    </div>
  );
}

export default App;
