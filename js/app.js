'use strict';

var allArr = [];
var dP=0;
getData1();
$('#page1Button').on('click',()=>{
  dP =0;
  allArr = [];
  $('main').empty()
  $('select').find('option').remove();
  $('select').append('<option value="default">Filter by Keyword</option>');
  getData1();
});
$('#page2Button').on('click',()=>{
  dP =1;
  allArr = [];
  $('main').empty()
  $('select').find('option').remove();
  $('select').append('<option value="default">Filter by Keyword</option>');
  getData2();
});



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
  persClone = $('#photo-template').html();
  let mustatchHTML = Mustache.render(persClone,this)
  $('main').append(mustatchHTML);
};

function getData1(){
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

function getData2(){
  $.get('data/page-2.json')
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
  $('main').empty()
  allArr.forEach(e => {
    if(e.keyword === choose || choose === 'default'){
      e.hii();
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
  allArr.sort(compareHorns);

  let s = $('select').children('option:selected').val();
  $('main').empty()
  allArr.forEach(e => {
    if(e.keyword === s || s === 'default'){
      e.hii();
    }
  });
});

$('.tt').on('click',function(){
  allArr.sort(compareTitle);
  let s = $('select').children('option:selected').val();
  $('main').empty()
  allArr.forEach(e => {
    if(e.keyword === s || s === 'default'){
      e.hii();
    }
  });
});
var tog =0 ;
$('main').on('click','div',function(){
  if(tog === 0){
    let s = $(this).index();
    let calledObj = allArr[s];
    $('main').empty();
    let persClone = '';
    persClone = $('#largeDiv').html();
    let mustatchHTML = Mustache.render(persClone,calledObj);
    $('main').append(mustatchHTML);
    tog++;
  }else{
    tog=0;
    $('main').empty();
    $('select').find('option').remove();
    $('select').append('<option value="default">Filter by Keyword</option>');
    allArr=[];
    if(dP===0) getData1();
    else getData2();
  }
});
// $('div').on('focusout',function(){
//   console.log('ssss');
// });
// $('#zz').on('mouseup',function(){
//   console.log('sadasd');
//   $('#largeDiv').hide();
//   $('main').children().show();
// });

