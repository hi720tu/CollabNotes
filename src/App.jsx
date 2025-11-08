import { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Grid,
  Paper,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { v4 as uuidv4 } from 'uuid';
import './App.css';

export default function App() {
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState({ title: '', content: '' });
  const [editingId, setEditingId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentNote(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentNote.title.trim() === '' || currentNote.content.trim() === '') {
      return;
    }

    if (editingId) {
      setNotes(notes.map(note => 
        note.id === editingId ? { ...currentNote, id: editingId } : note
      ));
      setEditingId(null);
    } else {
      setNotes([...notes, { ...currentNote, id: uuidv4(), timestamp: new Date() }]);
    }
    setCurrentNote({ title: '', content: '' });
  };

  const handleEdit = (note) => {
    setCurrentNote({ title: note.title, content: note.content });
    setEditingId(note.id);
  };

  const handleDelete = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          CollabNotes
        </Typography>
        
        <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Note Title"
              name="title"
              value={currentNote.title}
              onChange={handleInputChange}
              margin="normal"
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Note Content"
              name="content"
              value={currentNote.content}
              onChange={handleInputChange}
              margin="normal"
              variant="outlined"
              multiline
              rows={4}
            />
            <Button 
              type="submit" 
              variant="contained" 
              color="primary" 
              fullWidth 
              sx={{ mt: 2 }}
            >
              {editingId ? 'Update Note' : 'Add Note'}
            </Button>
          </form>
        </Paper>

        <Grid container spacing={3}>
          {notes.map((note) => (
            <Grid item xs={12} sm={6} key={note.id}>
              <Paper 
                elevation={2} 
                sx={{ 
                  p: 2,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <Typography variant="h6" gutterBottom>
                  {note.title}
                </Typography>
                <Typography variant="body1" sx={{ flex: 1 }}>
                  {note.content}
                </Typography>
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mt: 2 
                }}>
                  <Typography variant="caption" color="text.secondary">
                    {new Date(note.timestamp).toLocaleString()}
                  </Typography>
                  <Box>
                    <IconButton 
                      size="small" 
                      onClick={() => handleEdit(note)}
                      color="primary"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton 
                      size="small" 
                      onClick={() => handleDelete(note.id)}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}
