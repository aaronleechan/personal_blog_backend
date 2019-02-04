const graphql = require('graphql');
const _ = require('lodash');
const Product = require('../models/product');
const Brand = require('../models/brand');
const Wallpaper = require('../models/wallpaper');

const{ 
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLList,
    GraphQLNonNull
} = graphql;



const ProductType = new GraphQLObjectType({
    name: 'Product',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        price: {type: GraphQLString},
        imageurl: {type: GraphQLString},
        brand:{
            type: BrandType,
            resolve(parent,args){ //resolve function is looking for actual data and return what is needed
                // console.log(parent);
                // return _.find(brands,{id: parent.brandId});
                return Brand.findById(parent.brandId);
            }
        }
    })
});

const BrandType = new GraphQLObjectType({
    name: 'Brand',
    fields:() =>({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        location: {type: GraphQLString},
        products:{
            type: new GraphQLList(ProductType),
            resolve(parent,args){
                // console.log(parent);
                // return _.filter(products,{brandId: parent.id})
                return Product.find({brandId: parent.id})
            }
        }
    })
});

const CarouselType = new GraphQLObjectType({
    name: 'wallpaper',
    fields:() =>({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        imageurl: {type: GraphQLString},
        wallpapers:{
            type: new GraphQLList(CarouselType),
            resolve(parent,args){
                return  Wallpaper.find({wallpaperId: parent.id})
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields:{
        product:{ //Return the product according to the Product ID
            type: ProductType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                //code to get data from db / other source
                // return _.find(products,{id: args.id});
                return Product.findById(args.id);
            }
        },
        brand:{ // Return the brand according to the Brand ID
            type: BrandType,
            args: {id:{type: GraphQLID}},
            resolve(parent,args){
                //code to get from db/ other source
                //return _.find(brands,{ id: args.id});
                return Brand.findById(args.id);
            }
        },
        products:{ // Return all the Products
            type: new GraphQLList(ProductType),
            resolve(parent,args){
                //return products
                return Product.find({})
            }
        },
        brands: {
            type: new GraphQLList(BrandType),
            resolve(parent,args){
                //return brands
                return Brand.find({})
            }
        },
        wallpapers:{
            type: new GraphQLList(CarouselType),
            resolve(parent,args){
                return Wallpaper.find({})
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields:{ // Add, Delete Brand
        addBrand:{
            type: BrandType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)},
                location: {type: new GraphQLNonNull(GraphQLString)},
            },
            resolve(parent,args){
                let brand = new Brand({
                    name: args.name,
                    location: args.location
                });
                return brand.save();
            }
        },
        addProduct: {
            type: ProductType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)},
                price: {type: new GraphQLNonNull(GraphQLString)},
                imageurl:{type: new GraphQLNonNull(GraphQLString)},
                brandId: {type: new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent,args){
                let product = new Product({
                    name: args.name,
                    price: args.price,
                    imageurl: args.imageurl,
                    brandId: args.brandId
                });
                return product.save();
            }
        },
        addWallpaper:{
            type: CarouselType,
            args:{
                name: {type: new GraphQLNonNull(GraphQLString)},
                imageurl:{type: new GraphQLNonNull(GraphQLString)},
            },
            resolve(parent,args){
                let wallpaper = new Wallpaper({
                    name: args.name,
                    imageurl: args.imageurl,
                });
                return wallpaper.save();
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})