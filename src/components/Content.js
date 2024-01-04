import React,{useEffect,useState} from 'react'
import { apiUrl,filterData } from './FilterData'
import { toast } from "react-toastify";
import Spinner from './Spinner';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Filter from './Filter';
import ContentTable from './ContentTable';
import { FaLink } from "react-icons/fa";
import TeamSection from './TeamSection';
const Content = () => {
  const navigate = useNavigate();
  const Team = () => navigate('/TeamSection');

  
  const [featuredata,setfeaturedata]=useState([]);
  const[loading,setloading]=useState(true);
  const [category,setcategory]=useState(filterData[0].title);


  async function fetchdata(){
    setloading(true);
    try{
      const result = await axios.get(apiUrl);
      console.log(result.data);
      setfeaturedata(result.data.data);
    }
    catch(error){
      toast.error("Something went wrong");
    }
    setloading(false);
  }
  useEffect(()=>{
    fetchdata();
  },[]);


  return (
    <>
    <div className='Background'>
      <div className='Page'>
        <div className='mainpage'>
              <div className='Uppermostmainpage'>
                <div className='Upperbody'>
                  <div className='Upperbody-text'>
                  WELCOME To the operating Systems Virtual Lab by Pune Institute Of Computer Technology
                  </div>
                </div>
              </div>
              <div className='Navbar1'>
                <div className='Navigationbar'>
                    <div className='menus'>Option 1</div>
                    <div className='menus'>Option 2</div>
                    <div className='menus'>Option 3</div>
                    <div className='menus'><span  onClick={Team}>About US</span></div>
                </div>
              </div>  
              <div className='Upper-mainpage'>
                <div className='info'> 
                    <div className='Video'>
                        <iframe width="560" height="315" src="https://www.youtube.com/embed/krzXKGKM0hg?si=3kz0a8EnGCAMMGIC" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                    </div>
                    <div className='info1'>
                      <div className='heading'>
                        About
                      </div>
                      <div className='writeup'>Welcome to the Pune Institute of Computer Technology's Operating System Virtual Lab. Our web-based platform offers a range of interactive experiments for students and enthusiasts to explore operating system concepts, providing real-world experience in process management, memory allocation, file systems, and more. Accessible anytime, this customizable and community-driven lab fosters knowledge-sharing, research opportunities, and practical skills development. Join us to unlock the full potential of operating systems and prepare for a successful career in the field of computer science.                  
                      </div>
                    </div>
                    <div className='info1'>
                        <div className='heading'>
                          Objectives
                        </div>
                        <div className='writeup'>
                          Our goal is to provide an accessible, interactive, and comprehensive platform for students and enthusiasts to deepen their understanding of operating systems. We aim to facilitate practical learning, research opportunities, and knowledge-sharing, empowering individuals to excel in computer science and related fields by gaining hands-on experience in operating system concepts.
                        </div>
                    </div>
                </div>
                {/* <div className="main-content"> */}
                          {/* <div className='Navbar2'>
                          <div className='Navigationbar'>
                              <div className='menus'>Option 1</div>
                              <div className='menus'>Option 2</div>
                              <div className='menus'>Option 3</div>
                              <div className='menus'><span  onClick={Team}>About US</span></div>
                          </div>
                        </div>  */}
                        <div className="main-content">
                          <div className='filterdata'>
                          <Filter filterData={filterData} category={category} setcategory={setcategory}></Filter>
                          
                          </div>
                          <div className="table-main">
                            {
                              loading ? (<Spinner></Spinner>):(<ContentTable setfeaturedata={setfeaturedata} featuredata={featuredata} category={category}></ContentTable>)
                            }
                          </div>
                          {/* </div> */}
                </div>
              </div>  
              
              <div className='Other-resources'>
                    <div className='heading'>Books</div>
                    <div className='textbody'>
                    <FaLink /><a href="https://pages.cs.wisc.edu/~remzi/OSTEP/">  Operating Systems: Three Easy Pieces</a>
                    </div>
                    <div className='textbody'>
                    <FaLink /><a href="http://www.cs.ukzn.ac.za/~hughm/os/notes/os.pdf">Operating System: An introduction to Unix,
and Operating Systems Theory</a>
                    </div>
                    
              </div>
              <div className='Other-resources'>
                    <div className='heading'>Other Important Resources</div>
                    <div className='textbody'>
                    <FaLink /><a href="https://www.geeksforgeeks.org/last-minute-notes-operating-systems/">Last Minute Notes – Operating Systems</a>
                    </div>
                    <div className='textbody'>
                    <FaLink /><a href="https://drive.uqu.edu.sa/_/mskhayat/files/MySubjects/2017SS%20Operating%20Systems/Abraham%20Silberschatz-Operating%20System%20Concepts%20(9th,2012_12).pdf">Operating System Concepts</a>
                    </div>
                    <div className='textbody'>
                    <FaLink /><a href="https://www.geeksforgeeks.org/operating-systems-interview-questions/">Top 100 Operating System Interview Questions</a>
                    </div>
                    <div className='textbody'>
                     <FaLink /><a href="https://www.youtube.com/playlist?list=PLxCzCOWd7aiGz9donHRrE9I3Mwn6XdP8p">Videos</a>
                    </div>
              </div>
              <hr />
              <div>
             <TeamSection></TeamSection>
              </div>
              <div className='Lower-mainpage'>
                <div className='LongBar'>
                        <div className='contact'>
                            <div className='Lower-header'>
                              Contact Us
                            </div>
                            <div className='Lower-body'>
                              Phone No: 020 2437 2041
                              <br></br>
                              E-mail :  abcd123@gmail.com
                            </div>
                        </div>
                        <div className='links'>
                          <div className='Lower-header'>
                                Address
                              </div>
                              <div className='Lower-body'>
                              Survey No. 27, Near, Trimurti Chowk, Bharati Vidyapeeth Campus, Dhankawadi, Pune, Maharashtra 411043
                            </div>

                        </div>
                        <div className='Social-media'>
                          <div className='Lower-header'>
                                Follow Us
                              </div>
                              <div className='Lower-body'>
                                <a href='https://www.linkedin.com/school/pune-institute-of-computer-technology/' target='_blank'><img src='Linkedin.webp'></img></a>
                                <a href='https://www.instagram.com/pict.pune/' target='_blank'><img src='insta.webp'></img></a>
                                <a href='https://twitter.com/PunePict' target='_blank'><img src='x.webp'></img></a>
                                <a href='https://www.facebook.com/PICTOfficial' target='_blank'><img src='fb.webp'></img></a>
                            </div>
                        </div>
                </div>
              </div>

        </div>
      </div>        
    </div>
    </>
  )
}

export default Content