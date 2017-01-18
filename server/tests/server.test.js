const expect = require('expect');
const request = require ('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const todos = [{
  _id: new ObjectID(),
  text: 'First test todo'
}, {
  _id: new ObjectID(),
  text: 'Second test todo',
  completed: true,
  completedAt: 333
}];

beforeEach((done) => {
  Todo.remove({}).then(() => {
    Todo.insertMany(todos);
  }).then(() => done());
});

describe('POST /todos', () => {
  it('should create a new todo', (done) => {
    var text = 'Test todo text';

    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if(err) {
          return done(err);
        }

        Todo.find({text}).then((todos) => {
            expect(todos.length).toBe(1);
            expect(todos[0].text).toBe(text);
            done();
        }).catch((e) => done(e));
      });
    });

  it('should not create todo with invalid body data', (done) => {

    request(app)
    .post('/todos')
    .send({})
    .expect(400)
    .end((err, res) => {
      if(err) {
        return done(err);
      }

    Todo.find().then((todos) => {
      expect(todos.length).toBe(2);
      done();
    }).catch((e) => done(e));
  });
});
});

describe('GET /todos', () => {
  it('should get all todos', (done) => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(2);
      })
      .end(done);
  });
});

  describe('GET /todos/:id', () => {
    it('should return todo doc', (done) => {
      request(app)
        .get(`/todos/${todos[0]._id.toHexString()}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.todo.text).toBe(todos[0].text);
        })
        .end(done);
    });

      it('should return 404 if todo not found', (done) => {
        var hexId = new ObjectID().toHexString();
        request(app)
        .get(`/todos/${hexId}`)
        .expect(404)
        .end(done);
        //make a request using real objectID  new objectid
        //make sure you get a 404 back
      });

      it('should return 404 for non object ids', (done) => {
        request(app)
        .get('/todos/123abc')
        .expect(404)
        .end(done);
        // /todos/123 this is valid url but 123 can' convert to objectID
      });
    });

    describe('DELETE /todos/:id', () => {
      it('should remove a todo', (done) => {
        var hexId = todos[1]._id.toHexString();

        request(app)
        .delete(`/todos/${hexId}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.todo._id).toBe(hexId);
        }) //expect assertion
        .end((err, res) => {
          if (err) {
            return done(err);
          } //if err
          //challenge: query database using findById toNotExist
          //expect(null).toNotExist();
          else {
            Todo.findById(hexId).then((todo) => {
              expect(todo).toNotExist();
              done();
            }).catch((e) => done(e));
          } //else bracket
        }); //end assertion
      }); //it should remove a todo

      it('should return 404 if todo not found', (done) => {
        var hexId = new ObjectID().toHexString();

        request(app)
        .delete(`/todos/${hexId}`)
        .expect(404)
        .end(done);
      });//it should return 404 if todo not found

      it('should return 404 if object id is invalid', (done) => {
        var hexId = new ObjectID().toHexString();

        request(app)
        .delete(`/todos/${hexId}`)
        .expect(404)
        .end(done);
      });//it should return 404 if object id is invalid
    });//describe 'DELETE' brackets

    describe('PATCH /todos/:id', () => {
      it('should update the todo', (done) => {
        //grab id of first item
        //url with id inside, send data as request body
        //update text, set completed true
        //expect 200
        var hexId = todos[0]._id.toHexString();
        var changedText = 'This shits tested';

        var completedTime = todos[0].completedAt = 345;

        request(app)
        .patch(`/todos/${hexId}`)
        .send({
          completed: true,
          text: changedText
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.todo.text).toBe(changedText);
          expect(res.body.todo.completed).toBe(true);
          expect(res.body.todo.completedAt).toBeA('number');
        })
        //expect verify that text is changed, completed is true, completedAt is a number
          //.toBeA(number)
          .end(done);
        });

      it('should clear completedAt when todo is not completed', (done) => {
        //grab id of second todo item
        var hexId = todos[1]._id.toHexString();
        //update text to something different
        var changedText = 'This shits tested second!';
        //set completed to false
        request(app)
        .patch(`/todos/${hexId}`)
        .send({
          completed: false,
          text: changedText
        })
        //expect 200
        .expect(200)
        //expect body reflects changes: text is changed, completed is false, completedAt is null
        .expect((res) => {
          expect(res.body.todo.text).toBe(changedText);
          expect(res.body.todo.completed).toBe(false);
          //.toNotExist() on expect
          expect(res.body.todo.completedAt).toNotExist();
        })
          .end(done);
      });
    });//describe PATCH brackets
