# ElloWanjohi

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## GraphQL
***


GraphQL endpoint :  https://fullstack-engineer-test-n4ouilzfna-uc.a.run.app/graphql

### Graphql Query: 
```
{book{
  author
  title
  pages{
    content
    pageIndex
    tokens{
      position
      value
    }
  }
}}
```

Coding challenge link 

https://github.com/ElloTechnology/full-stack-test/blob/main/README.md

Job Posting URL:

https://www.linkedin.com/jobs/search/?currentJobId=3067360481&f_I=4&f_JT=F%2CP%2CC%2CI&f_TPR=r2592000&f_WT=2%2C1%2C3&geoId=100710459&keywords=software%20developer&location=Kenya&sortBy=R


# Documentation

## Relevant Documents

a. app.module

b. app.component

c. book.component

d. book-page.component

e. word-definition.

f. graphql.module - 

g. book-model.ts - Type definitions


## How the application Works

***
a. When you open the app, **app.module** is loaded 


The module bootstraps to app.component whose html template provides a 
```
router-link
```

This is where our pages will be **rendered**.

b. app.routing module contains the following routes

```ts
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  }, {
    path: 'home',
    component: BookComponent,
  }, {
    path: 'home/word',
    component: WordDefinitionComponent,
  }

  ```

  This implies that when the application is loaded on a browser, the app will redirect to **book-component.ts**

  **book-component** retrieves the book when it is first **Initialized**



  ***

  ***

  ## IMPLEMENTATION

For a book, we are to show a double page. Imagine an array of pages

```ts
let pages = [0,1,2,3,4,5...]
```

If we want to show double pages - the data structures to use are

``` ts
let offset =  0  //the index of the first page 
let pageCount = 2 //the number of pages to show
let currentlyRenderedPages = []
```
From **pages** to show the **first two pages**, we 

```ts
let pages = [0,1,2,3,4,5...]
let offset =  0
let pageCount = 2 //the number of pages to show
let currentlyRenderedPages = []

currentlyRenderedPages = pages.slice(offset, pageCount)

// this returns 
// currentcurrentlyRenderedPages = [0,1]
```

### To move to the next(second) double page, we
***

```ts
  goToNextDoublePage() {
    this.offset = this.offset + this.pageCount;
    // this.offset = 0 + 2
    // this.offset = 2
    this.currentlyRenderedPages = this.book!.pages.slice(this.offset, (this.offset + this.pageCount));
    // this.currentlyRenderedPages = pages.slice(2,(2+2))
    // this.currentlyRenderedPages = pages.slice(2,4)
    // this.currentlyRenderedPages = pages.slice(2,4)
    // if pages = [0,1,2,3,4,5,6,7,...]
    // this.currentlyRenderedPages = [2,3]

  }
```

### To move to the previous double page, we

```ts
    goToPreviousDoublePage() {
    this.currentlyRenderedPages = this.book!.pages.slice((this.offset - this.pageCount), this.offset);
    this.offset = this.offset - this.pageCount;
  }
```

### To make page words that are tokenized clickable 
***
Excerpt from **book-page.component.ts**

let take an example

pageContent = "This is it"
pageTokens = []

```ts

  processPage() {
    let pageContent = "This"
    let tokens = [{value: "This", position: [0,3]}]

    if (pageContent !== '') {
      const pageContentInCharactersArray = Array.from(pageContent)
      let lengthOfTokens = tokens.length;
      // We are traversing the array from behind.
      // This is because when when are adding spans around clickable words,
      // we want to make sure that the indexes in the page tokens correspond to unaltered page content. 
      // Since the positions in the tokens start from zero, it is safe to add spans from the end of the page 
      // content ending at the the start
      for (let index = lengthOfTokens; index >= 0; index--) {
        try {
          const startIndex = tokens[index].position[0]
          const endIndex = tokens[index].position[1]

          //a new array representing the word ["T","h","i","s"]
          const charMatches = pageContentInCharactersArray.slice(startIndex, endIndex)
          // the length of the word in page content -> 4
          const actualStringOnDocument = charMatches.length

          // get the word in the token - this is the word to show on definition page
          const wordLink = tokens[index].value

          // for the word that matches the toke in the document, add a link tag around it
          //charMatched = <a href ='#home/word?name=This'>This</a>

          charMatches.unshift(`<a href="#/home/word?name=${wordLink}">`)
          charMatches.push("</a>")

          // From the original string -> "This"
          //after splicing we get ->  <a href ='#home/word?name=This'>This</a>
          pageContentInCharactersArray.splice(startIndex, (actualStringOnDocument), charMatches.join(''))


        } catch (error) {
        }
      }
      // after matching all clickable words we wrap the page content in a span -> 
      // we get -> <span>*content from above operation</span>
      pageContentInCharactersArray.unshift("<span>")
      pageContentInCharactersArray.push("</span>")

      // we then assing the pageContent to an element on our markup
      this.pageContent.nativeElement.innerHTML = pageContentInCharactersArray.join('')
    }
  }


```
