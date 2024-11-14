import app from './app';

// /HACK: PORT number should be in .env file
const PORT = 3001;

app.listen(PORT, () => {
    console.log('Express server listening on port ' + PORT);
});
