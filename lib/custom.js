var used = [],
    activate = 0,
    continueOn;

$(document).ready(function () {

    $('#myModal').modal('show');//displays modal on page load

    function build() {

        var startHTML = '<select id= "start">',
		endHTML = '<select id="end">',
		timeArray = [8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6],
        section = '',
        newRow = '<tr id="',//give id's to rows
        data = "<td class='timeStamp'>",
        data30 = "<td class='timeStamp alertnatingRows'>",
        dataDotted = "<td class='dotted'>",
        data30Dotted = "<td class='dotted alertnatingRows'>",
        minute30 = "<td class='alertnatingRows'>",
        timeStamp = "<td>";

        for (var i = 0; i < timeArray.length; i++) {

            var option = '<option>';

            if (timeArray[i] === 12 || timeArray[i] < 8) {
                var optionVal = '<option value="';
                startHTML += optionVal + timeArray[i] + 'PM">' + timeArray[i] + ': 00 PM' + '</option>' + optionVal + timeArray[i] + '30PM">' + timeArray[i] +
                ': 30 PM' + '</option>';
                endHTML += optionVal + timeArray[i] + 'PM">' + timeArray[i] + ': 00 PM' + '</option>' + optionVal + timeArray[i] + '30PM">' + timeArray[i] +
                  ': 30 PM' + '</option>';  //give value attributes

                //generate time values to select from



                section += newRow + timeArray[i] + 'PM' + '">';
                section += timeStamp + timeArray[i] + ': 00 PM ' + '</td>' + data + '&nbsp;</td>' + dataDotted + '&nbsp;</td>';
                section += '</tr>';
                section += newRow + timeArray[i] + '30PM' + '">';
                section += minute30 + timeArray[i] + ': 30 PM ' + '</td>' + data30 + '&nbsp;</td>' + data30Dotted + '&nbsp;</td>';
                section += '</tr>';

                //generates PM times for table

            }
            else {
                var optionVal = '<option value="';
                startHTML += optionVal + timeArray[i] + 'AM">' + timeArray[i] + ': 00 AM' + '</option>' + optionVal + timeArray[i] + '30AM">' + timeArray[i] +
                             ': 30 AM' + '</option>';
                endHTML += optionVal + timeArray[i] + 'AM">' + timeArray[i] + ': 00 AM' + '</option>' + optionVal + timeArray[i] + '30AM">' + timeArray[i] +
                  ': 30 AM' + '</option>';
                //generate time values to select from


                section += newRow + timeArray[i] + 'AM' + '">';
                section += timeStamp + timeArray[i] + ': 00 AM ' + '</td>' + data + '&nbsp;</td>' + dataDotted + '&nbsp;</td>';
                section += '</tr>';
                section += newRow + timeArray[i] + '30AM' + '">';
                section += minute30 + timeArray[i] + ': 30 AM ' + '</td>' + data30 + '&nbsp;</td>' + data30Dotted + '&nbsp;</td>';
                section += '</tr>';

                //generates AM times for table
            }
        }

        startHTML += '</select>';
        endHTML += '</select>';

        $('#startTimes').html(startHTML);
        $('#endTimes').html(endHTML);
        $('#tableBody').html(section);
        $('#tableBody tr').addClass('center');

        for (var tick = 0; tick < $('#tableBody tr').length; tick++) {
            used[tick] = false;
        }


    }; //generates table & options elements for 'select' html tag. assings values to start/end times

    build();//runs function, 'builds' page

    $('#submit').on('click', function () {

        continueOn = true;

        var startTime = $("#start option:selected").text(),
            endTime = $("#end option:selected").text(),
            enterEventName = $('#eventName').val(),
            enterEventContactExt = $('#contact').val(),
            eventInfo = [startTime, enterEventName, enterEventContactExt],
            eventHtml = '<tr id="' + $('#start').val() + '">',
            data = '<td>',
            rowArray = $('#tableBody tr'),
            selectedOp = $("#start option:selected").id,
			endValue = $('#end option:selected').val(),
			arrayIndex = [],
			selectedIndex,
            isFirst = true,
            dateValue = $('#datePicker').val(),
            start,
            end;

        for (var a = 0; a < rowArray.length;a++ ){

            if (rowArray[a].id === $('#start').val()) {
                start = a;
            }

            if (rowArray[a].id === $('#end').val()) {
                end = a - 1;
            }
        }

        if (activate > 0)
            check(start, end);

        $('#todaysDate').html(dateValue);//add date to date value

        for (var i = 0; i < rowArray.length; i++) {
 
            if (continueOn === false)
                break;

            arrayIndex[i] = i;

            if (startTime === endTime) {

                alert('Error. Your event can not start and end at the same time.');

                break;
            }

            if (rowArray[i].id === $('#start').val()) {

                selectedIndex = i;

                for (var j = 0; j < eventInfo.length; j++) {

                    eventHtml += data + eventInfo[j] + '</td>';

                }

                eventHtml += '</tr>';

                $('#' + $('#start').val() + '').replaceWith(eventHtml);

            }

            if (rowArray[i].id != endValue && i >= selectedIndex) {

                if (i === 0 && isFirst) {

                    isFirst = false;
                    $('#' + rowArray[i].id + ' td:nth-child(2)').addClass('firstborder');
                    $('#' + rowArray[i].id + ' td:nth-child(3)').addClass('firstborder');

                }

                if (isFirst) {
                    $('#' + rowArray[i].id + ' td:nth-child(2)').addClass('topBorders');
                    $('#' + rowArray[i].id + ' td:nth-child(3)').addClass('topBorders');
                    isFirst = false;
                }

                if ($('#' + rowArray[i].id + '').hasClass('alertnatingRows'));
                {
                    $('#' + rowArray[i].id + ' td:nth-child(2)').removeClass('alertnatingRows');
                    $('#' + rowArray[i].id + ' td:nth-child(3)').removeClass('alertnatingRows');
                    if (i % 2 == 1) {
                        $('#' + rowArray[i].id + '').addClass('alertnatingRows');
                    }

                }

                $('#' + rowArray[i].id + ' td:nth-child(2)').addClass('selected timeStamp');
                $('#' + rowArray[i].id + ' td:nth-child(3)').addClass('selected');
                $('#' + rowArray[i].id + ' td:nth-child(3)').removeClass('timeStamp');
                //$('.' + rowArray[i].id + ' td:nth-child(3)').addClass('selected timeStamp ');
            }




            if (rowArray[i].id === endValue) {
                $('#' + rowArray[i - 1].id + ' td:nth-child(2)').addClass('bottomBorder');
                $('#' + rowArray[i - 1].id + ' td:nth-child(3)').addClass('bottomBorder');
                break;
            }


            $('#eventName').val('');
            $('#contact').val('');


        }

        if (activate === 0)
            check(start, end);

        activate++;

    });//adds events to form

});

function check(startIndex, endIndex) {

    for (var k = startIndex; k <= endIndex; k++) {
        if (used[k] === true) {
            continueOn = false;
            alert('Error. This event will conflict with another event. Please review your start and end times.');
            break;
        }
    }

    if(continueOn!=false){
        for (var i = startIndex; i <= endIndex; i++) {
            used[i] = true;
        }
    }
}

$('#relaunch').on('click', function () {

    $('#myModal').modal('show');

});

$(function () {

    $('#datePicker').datepicker({

        altField: '#datePicker',
        altFormat: 'DD, mm/dd/yy'

    });

});

