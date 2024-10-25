

$(document).ready(function(){
    
  
    $('.ct_toggle_menu').click(function(){
        $('.ct_header nav').addClass('ct_show_menu')
    })
    $('.ct_close_menu').click(function(){
        $('.ct_header nav').removeClass('ct_show_menu')
    })

	// $('.ct_search_filter_cate_123 li').click(function(e){
	// 	$(this).child().addClass('ct_drop_show');
	//   });
	//   $(".ct_search_filter_cate_123 li .ct_filters_btn").on("click", function() {
	// 	$(".ct_search_filter_cate_123 li").not(this).removeClass("ct_drop_show"); // Remove class from all other divs
	// 	$(this).addClass("ct_drop_show");  
		
	// });

	$(".ct_search_filter_cate_123 li .ct_filters_btn").on("click", function() {
		// Remove class from all parent 'div' elements
		$(".ct_search_filter_cate_123 li .ct_filters_btn").parent(".ct_search_filter_cate_123 li").removeClass("ct_drop_show");
	
		// Add class to the parent 'div' of the clicked button
		$(this).closest(".ct_search_filter_cate_123 li").toggleClass("ct_drop_show");
	});

	$( '#multiple-select-optgroup-field' ).select2( {
		theme: "bootstrap-5",
		width: $( this ).data( 'width' ) ? $( this ).data( 'width' ) : $( this ).hasClass( 'w-100' ) ? '100%' : 'style',
		placeholder: $( this ).data( 'placeholder' ),
		closeOnSelect: false,
	} )
	
	$( '#multiple-select-optgroup-field2' ).select2( {
		theme: "bootstrap-5",
		width: $( this ).data( 'width' ) ? $( this ).data( 'width' ) : $( this ).hasClass( 'w-100' ) ? '100%' : 'style',
		placeholder: $( this ).data( 'placeholder' ),
		closeOnSelect: false,
	} )
	

	
	

    // Filter gallery js S
    	// 이미지 로딩 대기
	$('.ct_gallery_grid').imagesLoaded(function(){
		// grid 배치
		$('.ct_gallery_grid').isotope({
		  // options
		  itemSelector: '.ct_grid-item',
		  layoutMode: 'fitRows'
		});
	});

	


	
	
	

})



jQuery(document).ready(function() {
	jQuery('.ct_loader_main').fadeOut();

	
  });


  

  