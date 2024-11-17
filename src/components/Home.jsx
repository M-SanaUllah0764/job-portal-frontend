import React, { useEffect, useState } from 'react';
import { getJobs, deleteJob, updateJob } from '../services/api';
import { Container, Box, Typography } from '@mui/material';
import JobCard from '../components/JobCard';

const Home = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                setLoading(true);
                const response = await getJobs();
                if (response && response.length > 0) {
                    setJobs(response);
                } else {
                    setJobs([]);
                }
            } catch (err) {
                setError('Error fetching jobs');
            } finally {
                setLoading(false);
            }
        };
        fetchJobs();
    }, []);

    const handleDelete = async (jobId) => {
        try {
            await deleteJob(token, jobId);
            setJobs(prevJobs => prevJobs.filter(job => job._id !== jobId));
        } catch (error) {
            console.error('Error deleting job:', error);
        }
    };

    const handleUpdate = async (jobId, jobData) => {
        try {
            await updateJob(token, jobId, jobData);
            setJobs(prevJobs =>
                prevJobs.map(job =>
                    job._id === jobId ? { ...job, ...jobData } : job
                )
            );
        } catch (error) {
            console.error('Error updating job:', error);
        }
    };

    return (
        <Container sx={{ mt: 5 }}>
            <Typography variant="h4" align="center" gutterBottom>
                Browse Open Positions By Category
            </Typography>
            <Typography variant="subtitle1" align="center" gutterBottom>
                We are always on the lookout for talented people
            </Typography>
            {loading ? (
                <Typography>Loading...</Typography>
            ) : error ? (
                <Typography color="error">{error}</Typography>
            ) : jobs.length === 0 ? (
                <Typography>No jobs available</Typography>
            ) : (
                <Box sx={{ mt: 4 }}
                >
                    {jobs.map((job) => (
                        <JobCard
                            job={job}
                            key={job._id}
                            onDelete={handleDelete}
                            onUpdate={handleUpdate}
                        />
                    ))}
                </Box>
            )}
        </Container>
    );
};

export default Home;
