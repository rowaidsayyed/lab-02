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
Gal.prototype.hii = function(){
  let persClone = '';
  persClone = $('#photo-template').clone();
  persClone.removeAttr('id');
  persClone.find('h2').text(this.title);
  persClone.find('img').attr('src',this.url);
  persClone.find('img').attr('alt',this.title);
  persClone.find('p').text(this.description);
  $('main').append(persClone);
};

function getData(){
  $.get('data/page-1.json')
    .then (data =>{
      data.forEach(element => {
        let p = new Gal(element.image_url,element.title,element.description,element.keyword,element.horns);
        options(p);
      });
      allArr.sort(compareTitle);
      allArr.forEach((e) => {
        e.hii();
      });
      $('#photo-template').hide();
    });
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
  $('#photo-template').show();
  $('section').not('section:first').remove();
  allArr.forEach(e => {
    if(e.keyword === choose || choose === 'default'){
      e.hii();
    }
  });
  $('#photo-template').hide();
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
  allArr.sort(compareHorns);

  let s = $('select').children('option:selected').val();
  $('#photo-template').show();
  $('section').not('section:first').remove()
  allArr.forEach(e => {
    if(e.keyword === s || s === 'default'){
      e.hii();
    }
  });
  $('#photo-template').hide();
});

$('.tt').on('click',function(){
  allArr.sort(compareTitle);
  let s = $('select').children('option:selected').val();
  $('#photo-template').show();
  $('section').not('section:first').remove()
  allArr.forEach(e => {
    if(e.keyword === s || s === 'default'){
      e.hii();
    }
  });
  $('#photo-template').hide();
});

