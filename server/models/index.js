const graphql = require('graphql');
const _ = require('lodash');
const Book = require('./book');
const Author = require('./author');

const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLSchema,
	GraphQLID,
	GraphQLInt,
	GraphQLList,
	GraphQLNonNull
} = graphql;

const BookType = new GraphQLObjectType({
	name: 'Book',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		genre: { type: GraphQLString },
		author: {
			type: AuthorType,
			async resolve(parent, args){
				const { authorId } = parent;
				const author = await Author.findById(authorId);
				return author;
			}
		}
	})
});

const AuthorType = new GraphQLObjectType({
	name: 'Author',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		age: { type: GraphQLInt },
		books: {
			type: new GraphQLList(BookType),
			async resolve(parent, args){
				const { id } = parent;
				const book = await Book.find({ authorId: id });
				return book;
			}
		}
	})
});

const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		book: {
			type: BookType,
			args: { id: { type: GraphQLID } },
			async resolve(parent, args) {
				const { id } = args;
				const book = await Book.findById(id);
				return book;
			}
		},
		author: {
			type: AuthorType,
			args: { id: { type: GraphQLID } },
			async resolve(parent, args){
				const { id } = args;
				const author = await Author.findById(id);
				return author;
			}
		},
		books: {
			type: new GraphQLList(BookType),
			resolve(parent, args){
				return Book.find({});
			}
		},
		authors: {
			type: new GraphQLList(AuthorType),
			resolve(parent, args){
				return Author.find({});
			}
		}
	}
});

const Mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
		addAuthor: {
			type: AuthorType,
			args: {
				name: { type: GraphQLNonNull( GraphQLString ) },
				age: { type: GraphQLNonNull( GraphQLInt ) }
			},
			async resolve(parent, args){
				const { name, age } = args;
				const author = await Author.create({ name, age });
				return author;
			}
		},
		addBook: {
			type: BookType,
			args: {
				name: { type: new GraphQLNonNull( GraphQLString ) },
				genre: { type: new GraphQLNonNull( GraphQLString ) },
				authorId: { type: GraphQLNonNull( GraphQLID ) }
			},
			async resolve(parent, args){
				const { name, genre, authorId } = args;
				const book = await Book.create({ name, genre, authorId });
				return book;
			}
		}
	}
})

module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: Mutation
});
