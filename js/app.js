'use strict';

var allArr = [];


getData();

function Gal(url,title,description,keyword,horns){
  this.url = url;
  this.title = title;
  this.description = description;
  this.keyword = keyword;
  this.horns = horns;
  allArr.push(this);
}
function getData(){
  $.get('data/page-1.json')
    .then (data =>{
      data.forEach(element => {
        let p = new Gal(element.image_url,element.title,element.description,element.keyword,element.horns);
        options(p);
      });
      allArr.sort(compareTitle);
      allArr.forEach((e) => {
        displayImages(e);
      });
    });
}
function displayImages(imagge){
  $('main').append('<div id ="photo-template"> </div>')
  $('#photo-template').append(`<h2>${imagge.title}</h2>`);
  $('#photo-template').append(`<img src='${imagge.url}' alt='${imagge.title}' >`);
  $('#photo-template').append(`<p>${imagge.description}</p>`);
  $('#photo-template').append(`<p>Horns # = ${imagge.horns}</p>`);
  $('#photo-template').removeAttr('id');

}

function options(imagge){
  let z=0;
  for(let i = 0 ; i < allArr.length;i++){
    if (imagge.keyword === allArr[i].keyword) break;
    z++;
  }
  if(z=== allArr.length-1){
    $('select').append(`<option>${imagge.keyword}</option>`);
  }
}

$('select').on('change',function(){
  let choose = $(this).children('option:selected').val();
  $('main').empty();
  allArr.forEach(e => {
    if(e.keyword === choose || choose === 'default'){
      displayImages(e);
    }
  });
});

function compareHorns(a, b) {
  const elementA = a.horns
  const elementB = b.horns
  let comparison = 0;
  if (elementA < elementB) {
    comparison = 1;
  } else if (elementA > elementB) {
    comparison = -1;
  }
  return comparison;
}
function compareTitle(a, b) {
  const elementA = a.title.toUpperCase();
  const elementB = b.title.toUpperCase();

  let comparison = 0;
  if (elementA > elementB) {
    comparison = 1;
  } else if (elementA < elementB) {
    comparison = -1;
  }
  return comparison;
}
$('.num').on('click',function(){
  $('main').empty();
  allArr.sort(compareHorns);

  let s = $('select').children('option:selected').val();
  allArr.forEach(e => {
    if(e.keyword === s || s === 'default'){
      displayImages(e);
    }

  });
});

$('.tt').on('click',function(){
  $('main').empty();
  allArr.sort(compareTitle);
  let s = $('select').children('option:selected').val();
  allArr.forEach(e => {
    if(e.keyword === s || s === 'default'){
      displayImages(e);
    }

  });
});

