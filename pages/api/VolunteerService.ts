/*
* @2023 Digital Aid Seattle
*/
class VolunteerService {

  getRoles(): Promise<any[]> {
    // FIXME lookup roles
    return Promise.resolve(['qaSpecialist', 'solutionArchitect', 'productManager'])
  }
}

const volunteerService = new VolunteerService();

export { volunteerService };
