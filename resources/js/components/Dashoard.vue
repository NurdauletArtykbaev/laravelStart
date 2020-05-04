<template>


<div class="card">
    <div class="card-body">
    <div id="dashboardContainer"></div>

    <!-- <iframe width="1000" height="1500" src="http://desktop-0seasvv:90/ReportsPBI/powerbi/COVID-19%20US%20Tracking%20Sample?rs:embed=true" frameborder="0" allowFullScreen="true"></iframe> -->
    </div>

</div>
</template>


<script>

import * as pbi from 'powerbi-client';

export default {
        name: 'Dashboard',

        props: {
            msg: String
        },
        components:{
            pbi
        },
        mounted(){
            // Harded coded values pulled from example docs @https://microsoft.github.io/PowerBI-JavaScript/demo/v2-demo/index.html#
            var exampleToken = 'H4sIAAAAAAAEACWWNw7siBFE7_JTCqDnkAI24NB7bzN67z0F3V2j3bzRQXV11fvPHzN5-inJ__z7T9wgNNH7IrVQTS2QHjlOtGfyztcIq3nRCLxCn7eLYrTzYq7xP6m77yzqOrw8IidCrhW9vbqKlF7fR2hEA7oBv0K1iZ82iD5NLdYPzKEROQKHXfk2VhP8PfW5bHQ9Jyfu4XUZMZyT2RsAP6OD-bAo_YH806hgPFDgQrRLcN3j4PA7jCCG3Qlms0fCACTeIZEYHJcV_LtV4ILh1KnZaz1OakTtCENBpFWa3hrRQ-aKeBAB4lsl-4f-hgGxV5pvPME2sqKOQJSaNz1DpjH9MUtoLSBKx3jtaI_zAwPSMSdGu861wi6XTCi5N4DMZom7XhOsMmHxd5QpQwZVhWUZUqSgax_pNIG_XxkF3OW-YhjnRv_ZtxlKNJexS1gcy2GsG6f3okGKr2omiQDitQBCaTJ0hL0D3aRBIcjVh2gCSAxzjSi0VheixUsFVcdHjTYUYg77div8ejC-ODIaUm7vrc_r17HaIQCXvGt4MAJKV7XWnTIkIV3Vh5bv2swUT6br4eSibOiDGqBDW-ZDlYNVq57u8tQJROFAOiwBbT2WLJQaNjBXX5kd7TnIxh3TSpsm7NvRB3U27P70CUnqhLA55BP41P1mvVdD9oEG6lDOjOZSu3c624BZwNvvjbksk5FtPtcqxuuLnRla7PN969DHIDnWqiHilhoBDNpDfe_gQ3i3D9BJ4i7VcnVwbyMPLsKqBhAuEq9NqutY4cQNRAAMGdUwwW2LlgbahNJgKK2MfKp2sBvPtrWFC1PCKeohNSnXTPT2c7HpenBFKnG8fTkZsnJyPAqOdYrimqw4weOQCKQ4bqQwgDrdd-arQLxaxFatZ1eIK8lcwFpGvZmukNoUCVXCBlCQiJSlgExNH-2CduU2yMCmjyDHw1ySnvUh9xhJOYJD0lWbDRTeL-St4VyQjgF_3nMwDx8Tw5H3YS2ZilsDGI0n0t5HUkNbrnZFm4jRQ8SAViLpV0kWano5ReZRMgRV-sg_Xh1dhEcC31URhizPIKjKPou2Od_ZctxJ1JNgZZ2LI95UbtAB39yLC89gE4JgdX2GDZbKXmyPZEKcMHE1JrdBmmcLEixAaXprvVrl6QpT9RaOcpxrM8GimHbvOdCNF4JSc5hfGGRAT2_DsJGzDxG8a_EjoT53bMtndd8VRAWqFPjXN36X_EoAUbO_foFPYnPUff4Woji-vpi-pFuhBJy2U9pHSgULAowECoaIqXYPTskrq_uWWSQFfSCsJocJxkuloMEd0nK0IzjYOpGyT4isvBZiwMIZahw_k1sF6qxyWvw2EfjBVeReugYORciziYizFBD3CuNgtZ0LdUYAWqfPiXKLr3hwYG7t8lQtZ5XVGdGWrKY8-8VUv8AWkCzR9lqwTDn43kv24UCMyJLL_tQddw9ah9qnJh76wUSWzazkmNBFsyfGiI7tleh2dqKlh7vCR4nc7koGyJeoHaTTh8ICAM8FY5LUdMhMz4bIz2NqhxKZIe74WQ0DxdvTWhG1YxLaVnX9rK7ccofk7WLE1ljuw4pU6AzS2GPW0sz18fXEOr4yEMpUIm3BiuHOJCXBE2SjLYLYtmmBaZ2Y3xkXHEnJlvP9_RxFfShutseCz11THDsGBLsjjFM4akvbYJd5lSfFPSmh8hr-Cu8mpGGfeY_OA3SHRx30kKebnS2eC6IYC49IydIFYAU666IQgcZPaI9McnJKojebEXHOXG8CZBt7FcFaU0JjnKY-Pk5xX5ksGS_s7AbhqrrUhsqRWhJ-2Yfgs7dxXh8La99U9UKehDIpu1r9KgtfluQRxYl5yNNiuOwTXWnLtOC0r0cSlWAluP7QZPtbolDNm87rVuNGguZnagMCnxSeDeTj98gHHRNoo8k_ZOzTsi8HuHt66deaiPsCzbu_N_sL0nV3yXVB4krvze8dMwYfHmcQZ7RgZDdPZp5-DZv3QQJgU3SCT8m4QrPdYJqMNfewoOSXGyW9m4caKH3cZx7QEtv7LIyikUsLwNzuZaHXj3n7DEKwax2SeuIDOQlukLBay4-qa27sm7BuiTw-5NikBt-fjxSgzUHuKvAteXx4KnL4vp87sQH_nNT1OVHNVaDzdLNWt_eabIdyM-HuAUqXorxv4_lG0kyNk7VCFd08XUvKs03Wr7rOl0Dd-YPCHk4zKT7oK2CFMNnTcdkcOHH2-qN2biosjZboDlTTKpvoQY65KpLnnOGtlTKzmg9LiWH99deff_1h1mfeJ6V4fphipZs-kEzzSx0TDj3LQNFpLcr42bNPWiHsi6Kvs8XWjKy5kpaFOo0Vn91DWHFFYqlcCI1PJEHzMGaWlns_ohjsWHNJdWhbujllMF-60Dh9VFJ1gxzDwDFmIFsdp4MpaOiuBoh_HnbYsmk2dAqXXR6_wWAlcom9SPi7aElP4K9SFhBrc5suket1gJjRwfLNUN3DcK5MsS_1y1fPJQNWz1Xka5edGfXijIeFrumOUr2bqH3wDxWbxQ3mrr6hvOAFBcmrX2ptEwT6aDClZFlG42K7KrYsRe0zVtZUXWsWrr5y7CmZ17tdknkztnWBdnKJEhXFzj61q9DdtIHi8L5GKKtOpdv1j8zPXBer5P9U5iK-wsPMigkTEymYn7w8VKu_p5ymGpP9WIvf2KHjdrYVkQgKgD1xVM6LQ0NCcIRj-p0DG5L56W04XrikTd2npUTyIVcbQo8r6hZv24J8tQ3n1jBFKtUMobJdGYA1wMJWW_ECqS_9yWPM8O-TWCgNB8pK2ObdN3fNo5aSvojVc86czzkxciPS5T2bVVsdbRwi9NDS4FphKY2jGZBI4Cy0CjQjydGeTH8KQ2Xo36BW7kAgj3j3OHAd_fjKbGwpCCn2rgqbLPT9hYWoraiPTSqCgzysFgaT-AIHVY2gJkQVQVE7H-J3LMLau566AGz1hZGhvCKKwro_yp0gZ9fa7IIsMVjqvnxVrXnhEw8tDZfKnVE2M9Sy3SIY0WkV6FL-L_N__wfFAGoGmgsAAA==';
            var exampleEmbededURL = 'http://desktop-0seasvv:90/ReportsPBI/powerbi/'
            //  'https://app.powerbi.com/reportEmbed?reportId=f6bfd646-b718-44dc-a378-b73e6b528204&groupId=be8908da-da25-452e-b220-163f52476cdd&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLVVTLU5PUlRILUNFTlRSQUwtcmVkaXJlY3QuYW5hbHlzaXMud2luZG93cy5uZXQiLCJlbWJlZEZlYXR1cmVzIjp7Im1vZGVybkVtYmVkIjpmYWxzZX19';
                // "https://app.powerbi.com/reportEmbed?reportId=f6bfd646-b718-44dc-a378-b73e6b528204&groupId=be8908da-da25-452e-b220-163f52476cdd&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLVVTLU5PUlRILUNFTlRSQUwtcmVkaXJlY3QuYW5hbHlzaXMud2luZG93cy5uZXQiLCJlbWJlZEZlYXR1cmVzIjp7Im1vZGVybkVtYmVkIjpmYWxzZX19";
            // var exampleDashboardId = "f6bfd646-b718-44dc-a378-b73e6b528204";
            var exampleDashboardId = "COVID-19%20US%20Tracking%20Sample?rs:embed=true";
            // Get models. models contains enums that can be used.
            //var models = window["powerbi-client"].models;

            const models = pbi.models;
            // Embed configuration used to describe the what and how to embed.
            // This object is used when calling powerbi.embed.
            // This also includes settings and options such as filters.
            // You can find more information at https://github.com/Microsoft/PowerBI-JavaScript/wiki/Embed-Configuration-Details.
            var config = {
                type: "report",
                // tokenType: models.TokenType.Embed,
                accessToken: exampleToken,
                embedUrl: exampleEmbededURL
                 + exampleDashboardId,
                id: exampleDashboardId,
            };

            // Get a reference to the embedded dashboard HTML element
            var $dashboardContainer = $("#dashboardContainer");

            var report = powerbi.embed($dashboardContainer.get(0), config);

            // Dashboard.off removes a given event handler if it exists.
            report.off("loaded");

            // Dashboard.on will add an event handler which prints to Log window.
            report.on("loaded", function () {
                console.log("loaded");
            });

            report.on("error", function (event) {
                console.log(event.detail);
                report.off("error");
            });

            report.off("tileClicked");
            report.on("tileClicked", function (event) {
                console.log(event.detail);
            });
//    var permissions = pbi.models.Permissions.All

//     var config = {
//           type: 'report',
//           tokenType:  pbi.models.TokenType.Embed,
//           accessToken: 'H4sIAAAAAAAEACWWR6rFCpJE9_KnKpB3BTWQ995rJu-9u1LTe-_X1Dwgk8hDRP7PP3b2jktW_vPvf7ZOPm-Ioxt1ka9MJ8krshwnO1ckXQ5jIqYT8tBYZ8oACe6pOZDI2Sopp38604kdgMuKMvj5ms_RHJwx1Pn79wz3kL95zvJF9dW1lkbRlIIylYUI6h_YeQhXJsnyr25w0PIn5LOycCPt07hIfdLWyzJLPF4woPYrqcSEUXlgXM9KgepG5htMYsugDByxD3x79AMPR5awZZXWw4v5bD3YASky33l-rpz9tDS-7CE2BxZQhfvy0b2AnMg15ogn71csvtjdKsyDG3a42l9OjqAiz_4MdoSWeDIuSrYWZYynIMBHcx4SX_05hL6ORnGUlWI6sG0vmtAP9IVKtxU6efvxQo-xtTy0C8KFCpyEfqdvjif29Ctis7bPY0BNOYkb-BSzSRnhNNxKs2c6Ehm4eYcvWVxhGHoj0tB7svyvD9OW-haeYAx4rrPPvCBPSdxWAFzeg5gqB1LcJx-bnWx1YbA1gXkny1VD6gcMzdQ78IvfrRu0XZLktEU7C9gtifBnH0kRCx2yGxYYn6qq-eDkvpcg1WJ8_4jWHDemG6Hrl6uA7_LMXu8_uRoEtoAz1HsboIB8rKsQqm_WE0VgzLMvNZLLffoBIAEslWnP0IV0mu00CdDvP5sQn_LRmAm86ByjbAiyEPi62IlMzatfsdR8F-laZb3IbyY2CcMwFE0V68cR90oippS2KkYqzU0eE3z27jas6122kXnP5rxvQ53wgQp16WrYqDfapUMLxRFSi7xOz5wEJRtSdsybWcppQINr26WEPZ7ZhBhEcacKm9hq0WrkWbZrfUi5gltercSurGZZ59uVps7kn_O7VZusPU4um2Tsi7Fm-_QKh-Q48z7_3OZZmD-Is-OI-67w8kVAuY3C9mGE0Khgc6RHovoLGspdy9Zd0do9M2_3Bf4P8ATANUpIUBSxK0hpVcrG7m_6musz7oOlZrBatqrZpAQLm0WsWiA3veLWB3t-IHzTsXdQ2_PESly1RG67Xwx4aLl-mHbzHUDdrkS9koPOBXsVJt2D6m1r642YQtqZ_DV-qDS2TA1O85zy8l1KvdTfw7Pe4biIv7-lkFLTizO-IfPwQxxeDoqfumyDnfwBK5BdednTa7meIqW3wdZzaiGnUrP5DZ4ogUd6w-7jKdS4pbETOjuvk4CfouF6tljPnY1IrmzttqN226pahRVE45EBv0QgA5jAnoVLGqk-QqY28nnZRs4lx_fSjbhBIAGuYlHBh-6TZAVVlR2LJjUjY2jQyJicVMl8b9SSiAfaCCwiLKWAKVyxue3qO4kqJthS9gYUpDEp7QdeULoSNZUR7jTF1lmeNZyIxy_Wr-P6W_rQvaVc_6XqJfsqdQPy9KLmflVHbfiOUfQWuNHCY1TjTDbWedRovpm1oyVy6GKNCH11b8h7tIuCgXFViITrTrBKMj_uGp-nG-zp65kuPmq1XPbUMsN6UeSaXh3Bgu1GKsOqJ74-Xu7BPAssxMxic-9OyIxD0FKQFqK7U9bhSa3dRDA40TA5_Rk_iTSMIqlQBlQ4A2Y8G0g1rPTRbLvvSKqxg5PWXHrl8z2q54m_IxTmzT1AuToJZGabd7y4DB0OdCWHdlEGb89XgZuwfvxsgxkbTTZIeM1a9sc2xIWyeMd62d9wbi3zc3cOoYuWy8KQQ3QDmX893BfB33yvpNlS118GReFl1B6cmdEulE4hEGQgeS-9udSTZ1jNVPfyES1HNrmSK8jORKOBeL5LGcSRx8DPh3S-mQtDOsXzPjoPt-xe7J3tHb9mvASwBwZiWjgxZQYznv9CEsXjS7NCbTKdiXr3PvVWkcrGshUv__euEV3Dv3hvyXt_BpditmswMZjPw59y-uQEDUEo3SnZF8EyNqNGm2enLWYeyOZJvnhCD6X8loSti0bx0ImP9pz0NbSCrk-tbCk-Y-cyLqsRJUu26xzXqjWfHqvCVj_B0msJ3R9Ed2x0frDJS8cE5hgQn0HEB_gzU4JrrVsvE0mem5qem8rnBkbKKe2Fy0igx1wUpFlx8n4uwDMVAXxGl0PrWFMLAtfLB8r-Ekt7rZUXmrRUl9BxpHMOyavYJz9YuhuaRDPDmhrdCkfHl9caoh1bdvAHhCiIQdVvYnQy71F_ZHmgApf0zJu6LwYNg8Ap17EtfmTKT7mBXJ8rcHndCIlNMLI-d8BDPmW1yQKaMoh-UpIgyLwypfl3NRFNUnnvt7DvcKdk_vOff_71D7e_67lo1fv3pqgUzXBcjU4BLGURqFO-to0Ze6YxDuLXuIEer8Y7s4g3yDhluyTThP7cDcs-EkLVszL5kArc5C9kb3MXxTEIATjvNw2uFvaewpUGLDsDfYr51WR06mzUpAOMN3Z_iPcROoCCcyiMJ97GRZZHp8TxpIbXs8jsvnsw8tX5wP6DSkMLZYgSJ7fawiHAY6v4A1-5rsSjPjkIBdaAmCbi4DuMRfaa0HRJgJPk2meR2hVn3D1NMFw4q4iMLl5aj2NxHozUqmKppt2brIeSXG8xz_zUjYn1JZVMS8xE0i8BDck5nBJJAlQ2WbNsz5oabNM5dS-mJz3yRjJTK-QcaZk9JX8wX4WK81-b37WtdiX8c5nPCny-A6GQMgQ8L5I3ZaD-r8rrmjk7r736kznUMkyKf46pUTVAvNIyzE6eA0KtTShuHUwClU9ybOGDSFaUkl-J-PMJftsv42jKgrERoSegvYy1lsbeFz8i_RFlp3WXdeco24_brLYIbncPOSGIii19xeExBeVWgr1UoFWz5zLMrV6MUqOi9Wizl5VeTHA6-scpoY873We1FOdYjVRW21h6pIPKFjX1JfDGjk9y2-mAZpTwLGpFn0jCEJQImLQqW9lP5MGfu6aaC-b-lGzgjEsvWJeoA0elBKFFUo5SvH7HEbQUQo2LlkUdhqE8p6tzfl-PthlFQ4GtNki_NioARilnuno9MX81DXKJ1-GdYDVbzhykV1SWFQyObtL3_zP_v_8HKLtlrpoLAAA=',
//           embedUrl: 'https://app.powerbi.com/reportEmbed?reportId=f6bfd646-b718-44dc-a378-b73e6b528204&groupId=be8908da-da25-452e-b220-163f52476cdd&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLVVTLU5PUlRILUNFTlRSQUwtcmVkaXJlY3QuYW5hbHlzaXMud2luZG93cy5uZXQiLCJlbWJlZEZlYXR1cmVzIjp7Im1vZGVybkVtYmVkIjpmYWxzZX19',
//           id: 'f6bfd646-b718-44dc-a378-b73e6b528204',
//           permissions: permissions,
//           settings: {
//               filterPaneEnabled: true,
//               navContentPaneEnabled: true
//           }
//       };


//     let powerbi = new pbi.service.Service(pbi.factories.hpmFactory, pbi.factories.wpmpFactory, pbi.factories.routerFactory);
//     var reportContainer = document.getElementById('container');
//     var report = powerbi.embed(reportContainer, config);

// report.off("loaded");

//             // Dashboard.on will add an event handler which prints to Log window.
//             report.on("loaded", function () {
//                 console.log("loaded");
//             });

//             report.on("error", function (event) {
//                 console.log(event.detail);
//                 report.off("error");
//             });

         
    // report.off("loaded");


    // report.off("rendered");



    // report.on("error", function () {
    //     this.report.off("error");
    // });
  },

  created () {


 

  }
}
</script>
<style scoped>
.powerbi{
    width: 100%;
    height: 100%;
    font-size: 24px;
}
.card{
    width: 100%;
    height: 900px;
}
#dashboardContainer{
   width: 100%;
    height: 100%;
}


</style>