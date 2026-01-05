// plugins/statcounter.js
export default function statcounterPlugin() {
  return {
    name: 'docusaurus-plugin-statcounter',
    injectHtmlTags() {
      return {
        // 会插入到 </body> 前
        postBodyTags: [
          `<!-- Default Statcounter code for dayu website -->
<script type="text/javascript">
var sc_project=13194138; 
var sc_invisible=1; 
var sc_security="d4073d04"; 
</script>
<script type="text/javascript"
src="https://www.statcounter.com/counter/counter.js"
async></script>
<noscript><div class="statcounter"><a title="Web Analytics"
href="https://statcounter.com/" target="_blank" rel="noopener noreferrer"><img
class="statcounter"
src="https://c.statcounter.com/13194138/0/d4073d04/1/"
alt="Web Analytics"
referrerpolicy="no-referrer-when-downgrade"></a></div></noscript>
<!-- End of Statcounter Code -->`,
        ],
      };
    },
  };
}
