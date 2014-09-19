$(document).ready(function () {

    $('#eventDate').text('test');

    $('#myModal').modal('show');//displays modal on page load

    function build() {

        var startHTML = 'Start time: <select id= "start">',
		endHTML = 'End time: <select id="end">',
		timeArray = [8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6],
        section = '',
        newRow = '<tr id="',//give id's to rows
        data = "<td class='timeStamp'>",
        timeStamp = '<td>';

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
                section += timeStamp + timeArray[i] + ': 00 PM ' + '</td>' + data + '&nbsp;</td>' + data + '&nbsp;</td>';
                section += '</tr>';
                section += newRow + timeArray[i] + '30PM' + '">';
                section += timeStamp + timeArray[i] + ': 30 PM ' + '</td>' + data + '&nbsp;</td>' + data + '&nbsp;</td>';
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
                section += timeStamp + timeArray[i] + ': 00 AM ' + '</td>' + data + '&nbsp;</td>' + data + '&nbsp;</td>';
                section += '</tr>';
                section += newRow + timeArray[i] + '30AM' + '">';
                section += timeStamp + timeArray[i] + ': 30 AM ' + '</td>' + data + '&nbsp;</td>' + data + '&nbsp;</td>';
                section += '</tr>';

                //generates AM times for table
            }
        }

        startHTML += '</select>';
        endHTML += '</select>';

        $('#startTimes').html(startHTML);
        $('#endTimes').html(endHTML);
        $('#tableBody').html(section);
        $('#tableBody tr:odd').addClass('alertnatingRows');
        $('#tableBody tr').addClass('center');
    
    }; //generates table & options elements for 'select' html tag. assings values to start/end times

    build();//runs function, 'builds' page
    

    $('#submit').on('click', function () {

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
			selectedIndex;
    

        for (var i = 0; i < rowArray.length; i++) {

            arrayIndex[i] = i;

        }

        var isFirst = true;
        for (var i = 0; i < rowArray.length; i++) {
            console.log(rowArray);
            if (rowArray[i].id === $('#start').val()) {
                selectedIndex = i;
                for (var j = 0; j < eventInfo.length; j++) {

                    eventHtml += data + eventInfo[j] + '</td>';

                }

                eventHtml += '</tr>';

                $('#' + $('#start').val() + '').replaceWith(eventHtml);

            }


            
            if (rowArray[i].id != endValue && i >= selectedIndex) {
                if ($('#' + rowArray[i].id + '').hasClass('alertnatingRows'));
                {
                    if (isFirst) {
                        $('#' + rowArray[i].id + ' td:nth-child(2)').addClass('topBorder');
                        isFirst = false;
                    }
                    $('#' + rowArray[i].id + ' td:nth-child(2)').removeClass('alertnatingRows');
                    $('#' + rowArray[i].id + ' td:nth-child(3)').removeClass('alertnatingRows');
                }

                $('#' + rowArray[i].id + ' td:nth-child(2)').addClass(' + selected');
                $('#' + rowArray[i].id + ' td:nth-child(3)').addClass(' + selected');

            }

            
            

            if (rowArray[i].id === endValue) {
                $('#' + rowArray[i - 1].id + ' td:nth-child(2)').addClass('bottomBorder');
                $('#' + rowArray[i - 1].id + ' td:nth-child(3)').addClass('bottomBorder');
                break;
            }
        }

    });//adds events to form

    $('#print').on('click', function () {

        window.print();

    });//print click event, sends user to print preview


});

