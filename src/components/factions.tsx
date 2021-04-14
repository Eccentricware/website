import React, { PureComponent } from 'react';
import { Table, Image } from 'semantic-ui-react'

type ShuttleInfoProps =  {
  factionInfo: object
};

class FactionInfo extends PureComponent<ShuttleInfoProps> {
  _reputations(score) {
    if (score >= 1000)
      return 'Honoured';
    else if (score >= 0)
      return 'Allied';
    else if (score >= -500)
      return 'Friendly';
    else if (score >= 1000)
      return 'Neutral';
    else if (score >= 2000)
      return 'Hostile';
    else
      return 'Dispised';
  }

  _formatTime(hours) {
    let retVal = hours > 24 ? `${Math.floor(hours/24)} days ` : ''
    return retVal + `${hours%24} hours`
  }

  render() {
    const { factionInfo, shuttleBays } = this.props;

    return (
      <Table>
        <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Faction</Table.HeaderCell>
          <Table.HeaderCell>Reputation</Table.HeaderCell>
          <Table.HeaderCell>Shuttles needed</Table.HeaderCell>
          <Table.HeaderCell>Time needed</Table.HeaderCell>
        </Table.Row>
        </Table.Header>
        <Table.Body>
        {factionInfo.map(faction => {
          let shuttlesNeededToMaxRep = Math.ceil((1000 - faction.reputation)/10);
          let hoursNeededToMaxRep = Math.ceil(shuttlesNeededToMaxRep/shuttleBays)*3;
          let shuttlesNeededToTank = Math.ceil(faction.completed_shuttle_adventures/1.58);
          let hoursNeededToTank = Math.ceil(shuttlesNeededToTank/shuttleBays)*3;
          console.log(faction);
          return (
            <Table.Row>
              <Table.Cell><span><Image floated='left' size='mini' src={`${process.env.GATSBY_ASSETS_URL}${faction.imageUrl}`} />{faction.name}</span></Table.Cell>
              <Table.Cell>{this._reputations(faction.reputation)}</Table.Cell>
              <Table.Cell>
                {faction.reputation < 1000 && <p>You need {shuttlesNeededToMaxRep} successful shuttle missions to achieve honored status.</p>}
                <p>To tank your shuttles you need to run {shuttlesNeededToTank} shuttles at 14%.</p>
              </Table.Cell>
              <Table.Cell>
                {faction.reputation < 1000 && <p>{this._formatTime(hoursNeededToMaxRep)}</p>}
                <p>{this._formatTime(hoursNeededToTank)}</p>
              </Table.Cell>
            </Table.Row>
          );
        })}
        </Table.Body>
      </Table>
    );
  }
}

export default FactionInfo;
