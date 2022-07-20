/* ************** handling the NDCal search ****************** */
$("#search-form-ndcal").submit(function(event){
	event.preventDefault(); //prevent default action 
	var post_url = $(this).attr("action"); //get form action url
	var request_method = $(this).attr("method"); //get form GET/POST method
	var form_data = $(this).serialize(); //Encode form elements for submission

	jQuery.ajax({
		url : post_url,
		type: request_method,
		data : form_data
	}).done(function(response){ //
		if(response != null && response != ""){
			$("#ndcal-results").show();
			$("#ndcal-results").html(response);
		}
	});
});
jQuery(document).ready(function(){
	var parties = new Bloodhound({
	datumTokenizer: Bloodhound.tokenizers.whitespace,
	queryTokenizer: Bloodhound.tokenizers.whitespace,
	prefetch: "/templates/ndcal-redesign-party-prefetch-ajax"
	});

	$('.partyid-typeahead').typeahead({
	hint: false,
	highlight: true,
	minLength: 1
	},
	{
	name: 'party',
	source: parties
	});

	$('.ndcal-reset').click(function(){
		$(':input','#search-form-ndcal')
		.not(':button, :submit, :reset, :hidden, :radio')
		.val('')
		.removeAttr('checked')
		.removeAttr('selected');
		$("#ndcal-results").html('');
		$("#ndcal-results").hide();
		$("input[name=decisionid]").prop('checked', false);
	});

	$("#myModal").on('click', '.modal-search-btn', function(){
		var decisionId = $('input[name=modal-decisionid]:checked').val();
		var judgeId = $(this).data('judgeid');

		if(judgeId){
			$(".judgeid-dropdown").val(judgeId);
		}
		if(decisionId){
			$("input[name=decisionid][value=" + decisionId + "]").prop('checked', true);
		}

		var lastTwoYears = new Date();
		var foo = lastTwoYears.setFullYear(lastTwoYears.getFullYear() - 2);
		$('#startdate').datepicker('setDate', lastTwoYears);
		$('#enddate').datepicker('setDate', new Date());
		$('form#search-form-ndcal').submit();
		$('#myModal').modal('toggle');
	});
});
