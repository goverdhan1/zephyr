
import { Component, OnDestroy, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ZephyrStore } from '../../../../store/zephyr.store';
import { AdminAction } from '../../../../actions/admin.action';

import * as d3 from 'd3';
import * as tip from 'd3-tip';
declare let moment: any;
declare let  jQuery;
declare let _;

@Component({
  selector: 'about-zephyr',
  templateUrl: 'about-zephyr.html'
})
export class AboutZephyrComponent implements OnDestroy {
    d3Copy: any = d3;
    form: FormGroup;
    error: boolean = false;
    unsubscribe;
    zephyrStore;
    licenseData;
    frequencyMapper;
    selectedFrequency;
    state;
    selectedReminderPref : any;
    licenseMap = {};
    width;
    height;
    data;
    zAutomationExpired=false;

    private minHeight = 200;
    private maxHeight = 400;
    private eachBarWidth = 30;

    constructor(fb: FormBuilder, private _adminAction: AdminAction,
                private elementRef: ElementRef) {

      this.form = fb.group({
        selectedFrequency: ['']
      });
      this.d3Copy['tip'] = tip;

      this.licenseData = {
        'companyName': '',
        'licenseId': '',
        'licenseEdition': '',
        'licenseType': '',
        'activationDate': '',
        'expirationDate': '',
        'custId': '',
        'email': '',
        'noOfTotalUser': '',
        'noOfPaidUser': '',
        'application': {
          'currentVersion': {},
          'latestVersion': {}
        },
        'validityLicenseMap': {},
        'zAutomationLicenseActivationDate':'',
        'zAutomationLicenseExpiry':''
      };

      this.frequencyMapper = {
        '-1': 'Never',
        '1': 'Daily',
        '5': 'in 5 days',
        '15': 'in 15 days',
        '30': 'in 30 days'
      };

      this.zephyrStore = ZephyrStore.getZephyrStore();
      this.state = this.zephyrStore.getState();


      if(Object.keys(this.state.loggedInUser).length){
        console.log('get license');
        this.getAppLicense();
        this.getAppInfo();
      }


      this.unsubscribe = this.zephyrStore.subscribe(() => {
       // console.log('store in admin-license', this.state);
        this.onInit();
      });
    }

    setChartData(data) {
      let margin = {
              'top': 10,
              'right': 10,
              'bottom': 40,
              'left': 50
          },
          width = 500,
          height = 300;

      let x = this.d3Copy.scaleBand()
          .domain(data.timeWindow.map(function(d) {
              return moment(d).format('MM/DD/YYYY');}))
          //.rangeRoundBands([0, width], 0)
          .range([0, width])
          .round(true);


      let y = this.d3Copy.scaleLinear()
          .domain([0, this.d3Copy.max(data.licenses)])
          .range([height, 0]);

      let xAxis = this.d3Copy.axisBottom().scale(x);

      let yAxis = this.d3Copy.axisLeft().scale(y);

      let tip = this.d3Copy.tip()
          .attr('class', 'd3-tip license-tip')
          .offset([-10, 0])
          .html(function(d) {
            // console.log('value of d', d);
            return '<span>License:</span> <span style="color:red">' + d + '</span>';
          });

      let svgContainer = this.d3Copy.select('#root').html('').append('svg')
          .attr('class', 'chart')
          .attr('width', width + margin.left + margin.right)
          .attr('height', height + margin.top + margin.bottom).append('g')
              .attr('transform', 'translate(' + margin.left + ',' + margin.right + ')');
      svgContainer.call(tip);

      svgContainer.append('g')
          .attr('class', 'x axis')
          .attr('transform', 'translate( 0,' + height + ')')
          .call(xAxis)
          .append('text')
              //.attr('transform', 'rotate(-90)')
              .attr('x', width / 2)
              .attr('dy', '3.71em')
              .style('text-anchor', 'middle')
              .style('fill', '#000')
              .text('Validity');

      svgContainer.append('g')
          .attr('class', 'y axis').call(yAxis)
          .append('text')
              .attr('transform', 'rotate(-90)')
              .attr('y', 0 - margin.left)
              .attr('x',0 - (height / 2))
              .attr('dy', '1.1em')
              .style('text-anchor', 'middle')
              .style('fill', '#000')
              .text('Licenses');

      svgContainer.selectAll('.bar').data(data.licenses).enter().append('rect')
          .attr('class', 'bar')
          .attr('x', function(d, i) {
              return i * x.bandwidth();
          })
          .attr('y', function(d) {
           // console.log('d in y', d);
              return y(d);
          })
          .attr('width', function(){
              return x.bandwidth();
          })
          .attr('height', function(d) {
            //console.log('d in height', y(d));
              return height -y(d);
          })
          .on('mouseover', tip.show)
          .on('mouseout', tip.hide);

    }

    updateFrequecy(value, type) {
      //console.log('value and type', value, type);
      this.zephyrStore.dispatch(this._adminAction.setAppInfo(value));
    }

    onInit() {
      this.setAppLicenseData();
    }

    ngOnDestroy() {
      this.unsubscribe();
    }

    getAppInfo() {
      this.zephyrStore.dispatch(this._adminAction.getAppInfo());
    }

    getAppLicense() {
      this.zephyrStore.dispatch(this._adminAction.getAppLicense());
    }


    setAppLicenseData() {
       let licenseInfo = this.licenseData = this.zephyrStore.getState().license;
      // console.log('all app data', licenseInfo);

      if (licenseInfo.companyName && licenseInfo.application && licenseInfo.application.currentVersion) {

        Object.keys(licenseInfo).forEach((k) => {
          this.licenseData[k] = (k === 'activationDate' || k === 'expirationDate'
                                  || k === 'zAutomationLicenseActivationDate'|| k === 'zAutomationLicenseExpiry')
                                  ? moment(licenseInfo[k]).format('MMM DD, YYYY') : licenseInfo[k];
        });

        if(licenseInfo.zAutomationLicenseActivationDate ||
            licenseInfo.zAutomationLicenseActivationDate){
          this.zAutomationExpired = true;
        }
        if(licenseInfo.validityLicenseMap && Object.keys(licenseInfo.validityLicenseMap).length) {
          let licenseMap = licenseInfo.validityLicenseMap;
          let chartData = {
            'timeWindow': [],
            'licenses': []
          };
          Object.keys(licenseMap).sort().forEach((key)=>{
             let l = moment(key).unix() * 1000;
             this.licenseMap[l] = licenseMap[key];
             chartData.timeWindow.push(key);
             chartData.licenses.push(licenseMap[key]);
          });
          this.setChartData(chartData);
          //console.log('this licensemap', this.licenseMap, chartData);
        }

        let allFrequencies = this.licenseData['application']['reminderFrequencies'];
        this.licenseData['application']['reminderFrequencies'] = typeof allFrequencies === 'string' ?
            allFrequencies.split('|') : allFrequencies;
        this.licenseData['frequencies'] = [];
        this.licenseData['application']['reminderFrequencies'].forEach((j) => {
          this.licenseData['frequencies'].push({
            'id': j,
            'value': this.frequencyMapper[j]
          });
        });
        let reminderPref = this.licenseData['application']['reminderFrequencyPref'] || -1;
        this.selectedReminderPref = this.licenseData['frequencies'].filter((entry) => {
          return parseInt(entry.id) === reminderPref;
        })[0];

        (<FormControl>this.form.controls['selectedFrequency'])
          .setValue(this.selectedReminderPref['id']);
        //console.log('selectedFrequency', this.selectedReminderPref, this.licenseData, this.licenseMap);


        this.licenseData['appVersion'] = licenseInfo.zephyrApplicationVersion;
      }

    }
}
