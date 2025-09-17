import natural from 'natural';

// Train spam classifier
const classifier = new natural.BayesClassifier();

classifier.addDocument("Win a free iPhone now!!!", 'spam');
classifier.addDocument("Congratulations! You have won a lottery!", 'spam');
classifier.addDocument("Meeting at 10am tomorrow", 'ham');
classifier.addDocument("Can you send me the report?", 'ham');
classifier.addDocument("Get cheap loans with no credit check", 'spam');
classifier.addDocument("Let's have lunch today", 'ham');

classifier.train();

const predictMessage = (message:any) => {
  return classifier.classify(message);
};

 export default predictMessage;
