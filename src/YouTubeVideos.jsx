import React, { useState } from 'react';
import axios from 'axios';
import { Button, Table } from 'react-bootstrap';

function YouTubeVideos() {
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState(null);

  const fetchYouTubeVideos = async () => {
    try {
      const apiUrl = 'http://localhost:8080/api/v1/public/youtube/videos?page=1&limit=10&query=javascript&sortBy=keep%20one%3A%20mostLiked%20%7C%20mostViewed%20%7C%20latest%20%7C%20oldest';
      const response = await axios.get(apiUrl);
      setVideos(response.data.data.data);
      console.log(response)
      setError(null);
    } catch (error) {
      console.error('Error fetching YouTube videos:', error);
      setVideos([]);
      setError('Error fetching YouTube videos.');
    }
  };

  return (
    <div>
      <h1>YouTube Videos</h1>
      <Button variant="primary" onClick={fetchYouTubeVideos}>
        Get YouTube Videos
      </Button>
      {videos && videos.length > 0 && (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Channel</th>
              <th>Published At</th>
              <th>Views</th>
              <th>Likes</th>
              <th>Dislikes</th>
            </tr>
          </thead>
          <tbody>
            {videos.map(video => (
              <tr key={video.id}>
                <td>{video.title}</td>
                <td>{video.description}</td>
                <td>{video.channel}</td>
                <td>{video.publishedAt}</td>
                <td>{video.views}</td>
                <td>{video.likes}</td>
                <td>{video.dislikes}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      {error && <p>{error}</p>}
    </div>
  );
}

export default YouTubeVideos;
