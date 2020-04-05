import app from './app';
import './database';

app.listen(app.get('PORT'), () => {
  console.log(`Server running on *:${app.get('PORT')}`);
});
