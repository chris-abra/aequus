$(document).ready(function() {
	/*$.getScript('http://ir.stockpr.com/service/quote_jsonp?symbol=aqs.v&jsonp=quote_search');
    $.getScript('http://ir.stockpr.com/service/quote_jsonp?symbol=AQSZF&jsonp=quote_search2');*/
    
    /*$.ajax({
        url: 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=aqs.v&interval=15min&apikey=BAKR3USDB5PIKYFQ',
        success: function(data) {
            var dataKey = 'Time Series (15min)';
            if(typeof data !== 'object' || !data[dataKey]) { return; }
            var keys = Object.keys(data[dataKey]);
            $(".stock-info .stock-date").text(keys[0]);
            $(".stock-info .stock-quote").text('$' + parseFloat(data[dataKey][keys[0]]['4. close']).toFixed(3));
        }
    });*/
    
        $.ajax({
            url: 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=aqs.v&apikey=BAKR3USDB5PIKYFQ',
            success: function(data) {
                var dataKey = 'Time Series (Daily)';
                if(typeof data !== 'object' || !data[dataKey]) { return; }
                var keys = Object.keys(data[dataKey]);
                var close = data[dataKey][keys[0]]['4. close'];
                var change = close - data[dataKey][keys[0]]['1. open'];
                $(".stock-info .stock-date").text(keys[0]);
                $(".stock-info .stock-quote").text('$' + parseFloat(data[dataKey][keys[0]]['4. close']).toFixed(3));
                $(".stock-info .stock-change").html('$' + (Math.round(change * 1000) / 1000).toFixed(3) + ' <span class="stock-change__percent">(' + (100 - Math.round((close - change) / close * 10000) / 100).toFixed(2) + '%)</span>');
                if(change >= 0) {
                    $(".stock-info .stock-change").addClass('up')
                } else {
                    $(".stock-info .stock-change").addClass('down');
                }
            }
        });
    
    /*$.ajax({
        url: 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=AQSZF&interval=15min&apikey=BAKR3USDB5PIKYFQ',
        success: function(data) {
            var dataKey = 'Time Series (15min)';
            if(typeof data !== 'object' || !data[dataKey]) { return; }
            var keys = Object.keys(data[dataKey]);
            $(".stock-info2 .stock-date").text(keys[0]);
            $(".stock-info2 .stock-quote").text('$' + parseFloat(data[dataKey][keys[0]]['4. close']).toFixed(3));
        }
    });*/

    $.ajax({
        url: 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=AQSZF&apikey=BAKR3USDB5PIKYFQ',
        success: function(data) {
            var dataKey = 'Time Series (Daily)';
            if(typeof data !== 'object' || !data[dataKey]) { return; }
            var keys = Object.keys(data[dataKey]);
            var close = data[dataKey][keys[0]]['4. close'];
            var change = close - data[dataKey][keys[0]]['1. open'];
            $(".stock-info2 .stock-date").text(keys[0]);
            $(".stock-info2 .stock-quote").text('$' + parseFloat(data[dataKey][keys[0]]['4. close']).toFixed(3));
            $(".stock-info2 .stock-change").html('$' + (Math.round(change * 1000) / 1000).toFixed(3) + ' <span class="stock-change__percent">(' + (100 - Math.round((close - change) / close * 10000) / 100).toFixed(2) + '%)</span>');
            if(change >= 0) {
                $(".stock-info2 .stock-change").addClass('up')
            } else {
                $(".stock-info2 .stock-change").addClass('down');
            }
        }
    });
});

// Quote Box
function quote_search(quote) {
    $('.stock-info .stock-quote').text('$' + (Math.round(quote.last * 100) / 100).toFixed(2));
	$('.stock-info .stock-date').attr('date-time',quote.last_trade_time).html(quote.last_trade_time);
    
    if(quote.change === "") {
        $('.stock-info .stock-change').html('Updating');
    } else {
        $('.stock-info .stock-change').html('$' + (Math.round(quote.change * 100) / 100).toFixed(2) + ' <span class="stock-change__percent">(' + (Math.round(parseFloat(quote.change_pct.replace(/[\-+]/g, '')) * 100) / 100).toFixed(2) + '%)</span>');
    }
    
    if (quote.change_image === 'http://a.eqcdn.com/stockpr/files/qb-change-up.gif') {
        $('.stock-info .stock-change').addClass('up');
    } else if (quote.change_image === 'http://a.eqcdn.com/stockpr/files/qb-change-down.gif') {
        $('.stock-info .stock-change').addClass('down');
    }
};

// Quote Box
function quote_search2(quote) {
    $('.stock-info2 .stock-quote').text('$' + (Math.round(quote.last * 100) / 100).toFixed(2));
	$('.stock-info2 .stock-date').attr('date-time',quote.last_trade_time).html(quote.last_trade_time);
    
    if(quote.change === "") {
        $('.stock-info2 .stock-change').html('Updating');
    } else {
        $('.stock-info2 .stock-change').html('$' + (Math.round(quote.change * 100) / 100).toFixed(2) + ' <span class="stock-change__percent">(' + (Math.round(parseFloat(quote.change_pct.replace(/[\-+]/g, '')) * 100) / 100).toFixed(2) + '%)</span>');
    }
    
    if (quote.change_image === 'http://a.eqcdn.com/stockpr/files/qb-change-up.gif') {
        $('.stock-info2 .stock-change').addClass('up');
    } else if (quote.change_image === 'http://a.eqcdn.com/stockpr/files/qb-change-down.gif') {
        $('.stock-info2 .stock-change').addClass('down');
    }
};
